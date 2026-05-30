import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreerEquipe() {
  const navigate = useNavigate();

  // Données factices pour la liste des membres
  const membres = Array(5).fill({
    name: "Nom de l'employé",
    username: "username",
    role: "administrateur",
    gender: "Homme",
    phone: "+216 ",
    status: "Présent"
  });

  return (
    <div style={styles.container}>
      {/* SIDEBAR GAUCHE FIXE */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <div style={styles.logoText}>LOGO</div>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItem} onClick={() => navigate('/home')}>📊 MON TABLEAU DE BORD</div>
          <div style={styles.navItem} onClick={() => navigate('/profil')}>👤 MON PROFIL</div>
          <div style={styles.navItem} onClick={() => navigate('/fiche-pointage')}>📅 MA FICHE DE POINTAGE</div>
          <div style={styles.navItem} onClick={() => navigate('/equipes')}>👥 MES ÉQUIPES</div> {/* Ajouté ici */}
          <div style={styles.navItemActive} onClick={() => navigate('/creer-equipe')}>👥 CRÉER ÉQUIPES</div>
          <div style={styles.navItem}>🗓️ MON PLANNING</div>
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={styles.logout} onClick={() => navigate('/')}>🔌 DÉCONNEXION</div>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        </div>
      </aside>

      {/* ZONE DE CONTENU PRINCIPAL */}
      <main style={styles.main}>
        {/* HEADER BLEU CLAIR */}
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>LAVANCE-</h2>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>👤</div>
            <span>Username ▾</span>
          </div>
        </header>

        <div style={styles.content}>
          <h2 style={styles.pageTitle}>Crée une nouvelle équipe</h2>
          <div style={styles.divider}></div>

          {/* SECTION FORMULAIRE */}
          <div style={styles.formGrid}>
            <div style={styles.formLeft}>
              <div style={styles.field}>
                <label style={styles.label}>Nom de l'équipe</label>
                <input style={styles.input} type="text" />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Manager de l'équipe</label>
                <select style={styles.input}><option>Manager</option></select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Membres</label>
                <select style={styles.input}><option>Membres</option></select>
              </div>
            </div>

            <div style={styles.formRight}>
              <div style={styles.field}>
                <label style={styles.label}>Description de l'équipe</label>
                <textarea style={styles.textarea} placeholder="Lorem Ipsum is simply dummy text..."></textarea>
              </div>
              <button style={styles.addBtn}>AJOUTER</button>
            </div>
          </div>

          {/* SECTION LISTE DES MEMBRES */}
          <h3 style={styles.sectionTitle}>Liste des membres</h3>
          <div style={styles.tableContainer}>
            {membres.map((m, i) => (
              <div key={i} style={styles.tableRow}>
                <div style={styles.cellAvatar}><div style={styles.avatarIcon}>👤</div></div>
                <div style={styles.cellMain}>{m.name}</div>
                <div style={styles.cell}>{m.username}</div>
                <div style={styles.cell}>{m.role}</div>
                <div style={styles.cell}>{m.gender}</div>
                <div style={styles.cell}>{m.phone}</div>
                <div style={styles.cellStatus}>
                   <span style={styles.statusDot}>●</span> {m.status}
                </div>
                <div style={styles.cellAction}>⋮</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#F0F7FF', fontFamily: 'sans-serif' },
  // Sidebar fixe à gauche
  sidebar: { width: '260px', backgroundColor: '#2196F3', color: 'white', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' },
  logoSection: { padding: '40px 20px', textAlign: 'center' },
  logoText: { fontSize: '28px', fontWeight: 'bold', letterSpacing: '2px' },
  nav: { flex: 1 },
  navItem: { padding: '12px 25px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', opacity: 0.9, textTransform: 'uppercase' },
  navItemActive: { padding: '12px 25px', fontSize: '10px', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' },
  sidebarFooter: { padding: '20px' },
  logout: { fontSize: '10px', fontWeight: 'bold', marginBottom: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  backBtn: { backgroundColor: 'white', border: 'none', borderRadius: '5px', width: '30px', height: '30px', color: '#2196F3', cursor: 'pointer' },
  
  // Main content à droite
  main: { flex: 1, marginLeft: '260px' },
  header: { height: '60px', backgroundColor: '#64B5F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', color: 'white' },
  headerTitle: { fontSize: '18px', margin: 0, fontWeight: 'bold' },
  userProfile: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' },
  userAvatar: { backgroundColor: 'white', color: '#64B5F6', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  
  content: { padding: '40px' },
  pageTitle: { color: '#2196F3', fontSize: '24px', margin: 0 },
  divider: { height: '1px', backgroundColor: '#BBDEFB', margin: '20px 0 40px 0' },
  
  // Formulaire
  formGrid: { display: 'flex', gap: '50px', marginBottom: '50px' },
  formLeft: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
  formRight: { flex: 1, display: 'flex', flexDirection: 'column' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#2196F3', fontSize: '13px', fontWeight: 'bold' },
  input: { padding: '12px', border: '1px solid #BBDEFB', borderRadius: '8px', backgroundColor: '#FBFDFF', outline: 'none', color: '#64B5F6' },
  textarea: { padding: '12px', border: '1px solid #BBDEFB', borderRadius: '8px', height: '120px', backgroundColor: '#FBFDFF', color: '#64B5F6', resize: 'none', marginBottom: '20px' },
  addBtn: { backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%' },
  
  // Liste tableau
  sectionTitle: { color: '#2196F3', fontSize: '20px', marginBottom: '20px' },
  tableContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  tableRow: { backgroundColor: 'white', padding: '15px 25px', display: 'flex', alignItems: 'center', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  cellAvatar: { width: '50px' },
  avatarIcon: { width: '35px', height: '35px', backgroundColor: '#E3F2FD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2196F3' },
  cellMain: { flex: 1.5, fontWeight: 'bold', fontSize: '14px', color: '#333' },
  cell: { flex: 1, fontSize: '13px', color: '#666' },
  cellStatus: { flex: 0.8, color: '#2196F3', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center' },
  statusDot: { marginRight: '8px', fontSize: '10px' },
  cellAction: { color: '#2196F3', fontSize: '20px', cursor: 'pointer' }
};