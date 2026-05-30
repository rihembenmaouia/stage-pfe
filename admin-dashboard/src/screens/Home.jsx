import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [pointages, setPointages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPointages();

    const channel = supabase
      .channel('realtime_pointages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'pointages' },
        () => { fetchPointages(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchPointages() {
    // 1. Njibou el data m-el database m3aha el nom wel prenom direct
    const { data: pointagesData, error: pointagesError } = await supabase
      .from('pointages')
      .select('id, status, date, heure_entree, user_id, status_qr, status_face, nom, prenom')
      .order('date', { ascending: false });

    if (pointagesError) {
      console.log("Erreur Supabase Pointages:", pointagesError.message);
      return;
    }
    setPointages(pointagesData || []);
  }

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <img src="/logo.png" alt="Aca ROBOTICS" style={styles.logoImage} />
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItemActive} onClick={() => navigate('/home')}>📊 MON TABLEAU DE BORD</div>
          <div style={styles.navItem} onClick={() => navigate('/profil')}>👤 MON PROFIL</div>
          <div style={styles.navItem} onClick={() => navigate('/fiche-pointage')}>📅 MA FICHE DE POINTAGE</div>
          <div style={styles.navItem} onClick={() => navigate('/equipes')}>👥 MES ÉQUIPES</div>
          <div style={styles.navItem} onClick={() => navigate('/creer-equipe')}>👥 CRÉER ÉQUIPES</div>
          <div style={styles.navItem} onClick={() => navigate('/creer-planning')}>🗓️ MON PLANNING</div>
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={styles.logout} onClick={() => navigate('/')}>🚪 DÉCONNEXION</div>
          <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>LAVANCE-</h2>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>👤</div>
            <span>Admin ▾</span>
          </div>
        </header>

        <div style={styles.content}>
          <div style={styles.topCardsRow}>
            <div style={styles.topCard}>
              <p style={styles.cardLabel}>Total Pointages</p>
              <h3 style={styles.cardValue}>{pointages.length}</h3>
            </div>
            <div style={styles.topCard}>
              <p style={styles.cardLabel}>Date d'aujourd'hui</p>
              <h3 style={styles.cardValue}>{new Date().toLocaleDateString('fr-FR')}</h3>
            </div>
          </div>

          <section style={{ textAlign: 'center' }}>
            <h3 style={styles.sectionTitle}>Liste des collaborateurs présents :</h3>

            <div style={{ ...styles.dataRow, fontWeight: 'bold', backgroundColor: '#64B5F6', color: 'white' }}>
              <span style={styles.cell}>Nom & Prénom</span>
              <span style={styles.cell}>QR Status</span>
              <span style={styles.cell}>Face Status</span>
              <span style={styles.cell}>Status Final</span>
              <span style={styles.cell}>Date / Heure</span>
            </div>

            <div style={styles.listContainer}>
              {pointages.map((p, index) => {
                const isPresent = p.status_qr === true && p.status_face === true;
                return (
                  <div key={index} style={styles.dataRow}>
                    {/* Tawa n-affichou el nom wel prenom direct */}
                    <span style={styles.cell}>{p.prenom} {p.nom}</span>
                    <span style={styles.cell}>{p.status_qr ? "✅ Valide" : "❌ Invalide"}</span>
                    <span style={styles.cell}>{p.status_face ? "✅ Valide" : "❌ Invalide"}</span>
                    <span style={{ ...styles.cell, color: isPresent ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>
                      ● {isPresent ? "Présent" : "Échec"}
                    </span>
                    <span style={styles.cell}>{p.date} - {p.heure_entree}</span>
                  </div>
                );
              })}
              {pointages.length === 0 && <p style={{marginTop: '20px', color: '#666'}}>Aucun pointage pour le moment.</p>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', height: '100vh', backgroundColor: '#D6EAF8', fontFamily: 'sans-serif' },
  sidebar: { width: '260px', backgroundColor: '#2196F3', color: 'white', display: 'flex', flexDirection: 'column' },
  logoSection: { backgroundColor: 'white', padding: '15px', textAlign: 'center', marginBottom: '30px' },
  logoImage: { width: '180px' },
  nav: { flex: 1 },
  navItem: { padding: '15px 25px', fontSize: '12px', fontWeight: 'bold', color: 'white', cursor: 'pointer', textTransform: 'uppercase' },
  navItemActive: { padding: '15px 25px', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#1E88E5', color: 'white', cursor: 'pointer' },
  sidebarFooter: { padding: '20px' },
  logout: { fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' },
  backButton: { width: '40px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: 'white', color: '#2196F3' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' },
  header: { height: '60px', backgroundColor: '#64B5F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', color: 'white' },
  headerTitle: { fontSize: '22px', fontWeight: 'bold' },
  userProfile: { display: 'flex', alignItems: 'center', gap: '10px' },
  userAvatar: { backgroundColor: 'white', color: '#2196F3', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  content: { padding: '40px' },
  topCardsRow: { display: 'flex', gap: '30px', marginBottom: '40px' },
  topCard: { flex: 1, backgroundColor: 'white', borderRadius: '10px', padding: '30px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  cardLabel: { fontSize: '24px', color: '#64B5F6', fontWeight: 'bold', marginBottom: '10px' },
  cardValue: { fontSize: '36px', color: '#64B5F6', fontWeight: 'bold' },
  sectionTitle: { fontSize: '28px', color: '#64B5F6', fontWeight: 'bold', marginBottom: '30px' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  dataRow: { backgroundColor: 'white', padding: '15px 10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', color: '#333', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  cell: { flex: 1, textAlign: 'center', fontSize: '14px' }
};