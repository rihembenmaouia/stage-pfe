import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Equipes() {
  const navigate = useNavigate();

  // Liste pour générer les 12 cartes de collaborateurs
  const collaborateurs = Array(12).fill({
    name: "Nom de l'employé",
    role: "Fonction de l'employé",
    entree: "8h05",
    duree: "3h24"
  });

  return (
    <div style={styles.container}>
      {/* --- SIDEBAR --- */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <div style={styles.logoText}>LOGO</div>
        </div>
        
        <nav style={styles.nav}>
          <div style={styles.navItem} onClick={() => navigate('/home')}>📊 MON TABLEAU DE BORD</div>
          <div style={styles.navItem} onClick={() => navigate('/profil')}>👤 MON PROFIL</div>
          <div style={styles.navItem} onClick={() => navigate('/fiche-pointage')}>📅 MA FICHE DE POINTAGE</div>
          <div style={styles.navItemActive} onClick={() => navigate('/equipes')}>👥 MES ÉQUIPES</div> {/* Ajouté ici */}
          <div style={styles.navItem} onClick={() => navigate('/creer-equipe')}>👥 CRÉER ÉQUIPES</div>
          <div style={styles.navItem}>🗓️ MON PLANNING</div>
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.logout} onClick={() => navigate('/')}>🔌 DÉCONNEXION</div>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>LAVANCE-</h2>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>👤</div>
            <span>Username ▾</span>
          </div>
        </header>

        {/* ONGLETS NAVIGATION */}
        <div style={styles.tabsContainer}>
          <div style={styles.tab}>Moi</div>
          <div style={styles.tabActive}>Mes équipes</div>
        </div>

        <div style={styles.content}>
          {/* CARTES STATS (HAUT) */}
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <h4 style={styles.statLabel}>MES COLLABORATEURS</h4>
              <div style={styles.statNumber}>17</div>
            </div>
            <div style={styles.statCard}>
              <h4 style={styles.statLabel}>MES ÉQUIPES</h4>
              <div style={styles.statNumber}>02</div>
            </div>
            <div style={styles.chartCard}>
              <div style={styles.circularBox}>
                <div style={styles.circularProgress}>67%</div>
              </div>
              <div style={styles.legend}>
                <div style={styles.legendItem}><span style={{color: '#90CAF9', marginRight: '8px'}}>●</span> Présent: <strong>3 Employés</strong></div>
                <div style={styles.legendItem}><span style={{color: '#2196F3', marginRight: '8px'}}>●</span> Sortie: <strong>7 Employés</strong></div>
                <div style={styles.legendItem}><span style={{color: '#444', marginRight: '8px'}}>○</span> Total: <strong>10 Employés</strong></div>
              </div>
            </div>
          </div>

          {/* SECTION GRILLE COLLABORATEURS */}
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>VOS COLLABORATEURS</h3>
            <div style={styles.filter}>Trier par <span style={styles.filterBox}>Tous</span></div>
          </div>

          <div style={styles.grid}>
            {collaborateurs.map((c, i) => (
              <div key={i} style={styles.collabCard}>
                <div style={styles.collabLeft}>
                  <div style={styles.avatarIcon}>👤</div>
                  <div>
                    <div style={styles.collabName}>{c.name}</div>
                    <div style={styles.collabRole}>{c.role}</div>
                  </div>
                </div>
                <div style={styles.collabRight}>
                  <div style={styles.timeRow}>
                    <span style={styles.blueIcon}>➔</span> {c.entree}
                  </div>
                  <div style={styles.timeRow}>
                    <span style={styles.blueIcon}>🕒</span> {c.duree}
                  </div>
                  <div style={styles.chevron}>›</div>
                </div>
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
  
  // Sidebar
  sidebar: { width: '240px', backgroundColor: '#2196F3', color: 'white', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' },
  logoSection: { padding: '30px', textAlign: 'center' },
  logoText: { fontSize: '24px', fontWeight: 'bold' },
  nav: { flex: 1 },
  navItem: { padding: '12px 25px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' },
  navItemActive: { padding: '12px 25px', fontSize: '10px', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.2)' },
  sidebarFooter: { padding: '20px' },
  logout: { fontSize: '10px', fontWeight: 'bold', marginBottom: '15px', cursor: 'pointer' },
  backBtn: { backgroundColor: 'white', border: 'none', borderRadius: '5px', width: '32px', height: '32px', color: '#2196F3', cursor: 'pointer' },

  // Main
  main: { flex: 1, marginLeft: '240px' },
  header: { height: '55px', backgroundColor: '#64B5F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', color: 'white' },
  headerTitle: { fontSize: '18px', margin: 0 },
  userProfile: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' },
  userAvatar: { backgroundColor: 'white', color: '#64B5F6', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  
  // Tabs
  tabsContainer: { backgroundColor: 'white', display: 'flex', padding: '0 40px', gap: '30px', borderBottom: '1px solid #BBDEFB' },
  tab: { padding: '15px 0', color: '#2196F3', fontWeight: 'bold', cursor: 'pointer' },
  tabActive: { padding: '15px 0', color: '#2196F3', fontWeight: 'bold', borderBottom: '3px solid #2196F3' },

  // Stats
  content: { padding: '30px 40px' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '35px' },
  statCard: { flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '25px', textAlign: 'center', border: '1px solid #E3F2FD' },
  statLabel: { color: '#2196F3', fontSize: '16px', margin: '0 0 10px 0' },
  statNumber: { color: '#2196F3', fontSize: '50px', fontWeight: 'bold' },
  
  chartCard: { flex: 1.2, backgroundColor: 'white', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '25px', border: '1px solid #E3F2FD' },
  circularBox: { width: '85px', height: '85px', borderRadius: '50%', border: '10px solid #2196F3', borderLeftColor: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  circularProgress: { color: '#2196F3', fontWeight: 'bold', fontSize: '16px' },
  legend: { fontSize: '12px', color: '#555', lineHeight: '1.8' },
  legendItem: { display: 'flex', alignItems: 'center' },

  // Grid
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { color: '#2196F3', fontSize: '18px', margin: 0, fontWeight: 'bold' },
  filter: { fontSize: '12px', color: '#2196F3' },
  filterBox: { border: '1px solid #2196F3', padding: '2px 10px', borderRadius: '4px', marginLeft: '5px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' },
  collabCard: { backgroundColor: 'white', padding: '12px', borderRadius: '8px', borderLeft: '8px solid #2196F3', display: 'flex', justifyContent: 'space-between', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  collabLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatarIcon: { width: '40px', height: '40px', backgroundColor: '#E3F2FD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2196F3', fontSize: '20px' },
  collabName: { fontWeight: 'bold', fontSize: '13px', color: '#333' },
  collabRole: { fontSize: '10px', color: '#999' },
  collabRight: { textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '2px' },
  timeRow: { fontSize: '11px', color: '#2196F3', fontWeight: '600' },
  blueIcon: { marginRight: '5px' },
  chevron: { backgroundColor: '#F0F7FF', color: '#2196F3', width: '18px', height: '18px', borderRadius: '4px', alignSelf: 'flex-end', textAlign: 'center', marginTop: '5px' }
};