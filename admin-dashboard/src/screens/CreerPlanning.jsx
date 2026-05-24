import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CreerPlanning() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  return (
    <div style={styles.container}>
      {/* SIDEBAR BLEUE FIXE */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}><div style={styles.logoText}>LOGO</div></div>
        <nav style={styles.nav}>
          <div style={styles.navItem} onClick={() => navigate('/home')}>📊 MON TABLEAU DE BORD</div>
          <div style={styles.navItem} onClick={() => navigate('/profil')}>👤 MON PROFIL</div>
          <div style={styles.navItem} onClick={() => navigate('/fiche-pointage')}>📅 MA FICHE DE POINTAGE</div>
          <div style={styles.navItem} onClick={() => navigate('/equipes')}>👥 MES ÉQUIPES</div> {/* Ajouté ici */}
          <div style={styles.navItem} onClick={() => navigate('/creer-equipe')}>👥 CRÉER ÉQUIPES</div>
          <div style={styles.navItemActive} onClick={() => navigate('/creer-planning')}>🗓️ MON PLANNING</div>
        </nav>
        <div style={styles.sidebarFooter}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>LAVANCE-</h2>
          <div style={styles.userProfile}><div style={styles.userAvatar}>👤</div><span>Username ▾</span></div>
        </header>

        <div style={styles.content}>
          <h2 style={styles.pageTitle}>Crée un nouveau planning</h2>
          <div style={styles.divider}></div>

          {/* FORMULAIRE HAUT */}
          <div style={styles.card}>
            <div style={styles.field}><label style={styles.label}>Titre*</label><input style={styles.input} /></div>
            <div style={styles.field}><label style={styles.label}>Description</label><textarea style={styles.textarea}></textarea></div>
          </div>

          {/* GRILLE DE PLANNING */}
          <div style={styles.planningGrid}>
            <div style={styles.gridHeader}>
              <div style={{flex: 1}}></div>
              <div style={{flex: 2, textAlign: 'center', borderBottom: '2px solid #BBDEFB', paddingBottom: '5px'}}>Partie 1</div>
              <div style={{flex: 2, textAlign: 'center', borderBottom: '2px solid #BBDEFB', paddingBottom: '5px'}}>Partie 2</div>
            </div>

            {jours.map((jour) => (
              <div key={jour} style={styles.gridRow}>
                <div style={styles.dayCell}>{jour}</div>
                {/* Partie 1 */}
                <input style={styles.timeInput} placeholder="Heure d'entrée" />
                <input style={styles.timeInput} placeholder="Heure de sortie" />
                {/* Partie 2 */}
                <input style={styles.timeInput} placeholder="Heure d'entrée" />
                <input style={styles.timeInput} placeholder="Heure de sortie" />
              </div>
            ))}
          </div>

          <button style={styles.saveBtn}>ENREGISTRER LE PLANNING</button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#F0F7FF', fontFamily: 'sans-serif' },
  sidebar: { width: '260px', backgroundColor: '#2196F3', color: 'white', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100 },
  logoSection: { padding: '40px 20px', textAlign: 'center' },
  logoText: { fontSize: '28px', fontWeight: 'bold' },
  nav: { flex: 1 },
  navItem: { padding: '12px 25px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', color: 'white' },
  navItemActive: { padding: '12px 25px', fontSize: '10px', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' },
  sidebarFooter: { padding: '20px' },
  backBtn: { backgroundColor: 'white', border: 'none', borderRadius: '5px', width: '30px', height: '30px', color: '#2196F3' },
  main: { flex: 1, marginLeft: '260px' },
  header: { height: '60px', backgroundColor: '#64B5F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', color: 'white' },
  headerTitle: { fontSize: '18px', margin: 0 },
  userProfile: { display: 'flex', alignItems: 'center', gap: '10px' },
  userAvatar: { backgroundColor: 'white', color: '#64B5F6', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  content: { padding: '40px' },
  pageTitle: { color: '#2196F3', fontSize: '24px', margin: 0 },
  divider: { height: '1px', backgroundColor: '#BBDEFB', margin: '15px 0 25px 0' },
  card: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #BBDEFB', marginBottom: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '15px' },
  label: { color: '#2196F3', fontSize: '12px', fontWeight: 'bold' },
  input: { padding: '10px', border: '1px solid #BBDEFB', borderRadius: '5px' },
  textarea: { padding: '10px', border: '1px solid #BBDEFB', borderRadius: '5px', height: '60px' },
  planningGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  gridHeader: { display: 'flex', gap: '10px', fontWeight: 'bold', color: '#2196F3', fontSize: '14px', marginBottom: '10px' },
  gridRow: { display: 'flex', gap: '10px', alignItems: 'center' },
  dayCell: { flex: 1, fontWeight: 'bold', color: '#333' },
  timeInput: { flex: 1, padding: '8px', border: '1px solid #BBDEFB', borderRadius: '5px', fontSize: '12px', textAlign: 'center' },
  saveBtn: { marginTop: '30px', backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-end' }
};