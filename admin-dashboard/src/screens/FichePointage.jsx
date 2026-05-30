import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase';
export default function FichePointage() {
  const navigate = useNavigate();
  const location = useLocation();

  // États pour les filtres
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [filtreTexte, setFiltreTexte] = useState("");
  
  // État pour les données de la base
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPointages();
  }, []);

  const fetchPointages = async (searchFilters = {}) => {
    setLoading(true);
    try {
      let query = supabase
        .from('fiche_pointage')
        .select('*')
        .order('date', { ascending: false });

      if (searchFilters.debut) {
        query = query.gte('date', searchFilters.debut);
      }
      if (searchFilters.fin) {
        query = query.lte('date', searchFilters.fin);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Formatage de la date (ex: "24 mai 2026")
      const formattedData = data.map(item => ({
        ...item,
        dateAffichage: new Date(item.date).toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric'
        })
      }));

      // Filtre de recherche général
      if (searchFilters.texte) {
        const txt = searchFilters.texte.toLowerCase();
        const localFiltered = formattedData.filter(log => 
          log.nom_prenom.toLowerCase().includes(txt) ||
          (log.entree && log.entree.includes(txt)) ||
          (log.sortie && log.sortie.includes(txt))
        );
        setLogs(localFiltered);
      } else {
        setLogs(formattedData);
      }

    } catch (error) {
      console.error("Erreur Supabase :", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPointages({
      debut: dateDebut.trim(),
      fin: dateFin.trim(),
      texte: filtreTexte.trim()
    });
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}><div style={styles.logoText}>LOGO</div></div>
        <nav style={styles.nav}>
          <div style={styles.navItem} onClick={() => navigate('/home')}>📊 MON TABLEAU DE BORD</div>
          <div style={styles.navItem} onClick={() => navigate('/profil')}>👤 MON PROFIL</div>
          <div style={styles.navItemActive} onClick={() => navigate('/fiche-pointage')}>📅 MA FICHE DE POINTAGE</div>
          <div style={styles.navItem} onClick={() => navigate('/equipes')}>👥 MES ÉQUIPES</div>
          <div style={styles.navItem} onClick={() => navigate('/creer-equipe')}>👥 CRÉER ÉQUIPES</div>
          <div style={styles.navItem}>🗓️ MON PLANNING</div>
        </nav>
        <div style={styles.sidebarFooter}>
           <div style={styles.logout} onClick={() => navigate('/')}>🔌 DÉCONNEXION</div>
           <button style={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        </div>
      </aside>

      {/* CONTENU */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>LAVANCE-</h2>
          <div style={styles.userProfile}><div style={styles.userAvatar}>👤</div><span>Dashboard ▾</span></div>
        </header>

        <div style={styles.content}>
          <h2 style={styles.pageTitle}>Tableau de bord des présences</h2>
          <div style={styles.divider}></div>

          {/* RECHERCHE */}
          <div style={styles.filterBar}>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="Date début (AAAA-MM-JJ)" 
              value={dateDebut} 
              onChange={(e) => setDateDebut(e.target.value)} 
            />
            <input 
              style={styles.input} 
              type="text" 
              placeholder="Date fin (AAAA-MM-JJ)" 
              value={dateFin} 
              onChange={(e) => setDateFin(e.target.value)} 
            />
            <input 
              style={styles.input} 
              type="text" 
              placeholder="Filtre (Nom, Heure...)" 
              value={filtreTexte} 
              onChange={(e) => setFiltreTexte(e.target.value)} 
            />
            <button style={styles.searchBtn} onClick={handleSearch}>Chercher</button>
          </div>

          {/* TABLEAU EXACT (Nom & Prénom, Date, Entrée, Sortie) */}
          <div style={styles.tableContainer}>
            <div style={styles.tableHeader}>
              <div style={styles.cellNom}>Nom & Prénom</div>
              <div style={styles.cellDate}>Date</div>
              <div style={styles.cellHeure}>Heure d'entrée</div>
              <div style={styles.cellHeure}>Heure de sortie</div>
              <div style={styles.cellAction}></div>
            </div>
            
            {loading ? (
              <div style={styles.noResult}>Chargement...</div>
            ) : logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={log.id || index} style={styles.tableRow}>
                  <div style={styles.cellNomText}>{log.nom_prenom}</div>
                  <div style={styles.cellDateText}>{log.dateAffichage || log.date}</div>
                  <div style={styles.cellHeureText}>{log.entree}</div>
                  <div style={styles.cellHeureText}>{log.sortie}</div>
                  <div style={styles.cellActionArrow}>›</div>
                </div>
              ))
            ) : (
              <div style={styles.noResult}>Aucun pointage trouvé.</div>
            )}
          </div>
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
  logout: { fontSize: '10px', fontWeight: 'bold', marginBottom: '15px', cursor: 'pointer' },
  backBtn: { backgroundColor: 'white', border: 'none', borderRadius: '5px', width: '30px', height: '30px', color: '#2196F3', cursor: 'pointer' },
  main: { flex: 1, marginLeft: '260px' },
  header: { height: '60px', backgroundColor: '#64B5F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', color: 'white' },
  headerTitle: { fontSize: '18px', margin: 0 },
  userProfile: { display: 'flex', alignItems: 'center', gap: '10px' },
  userAvatar: { backgroundColor: 'white', color: '#64B5F6', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  content: { padding: '40px' },
  pageTitle: { color: '#2196F3', fontSize: '24px', margin: 0 },
  divider: { height: '1px', backgroundColor: '#BBDEFB', margin: '15px 0 30px 0' },
  filterBar: { display: 'flex', gap: '10px', marginBottom: '30px' },
  input: { padding: '12px', border: '1px solid #90CAF9', borderRadius: '8px', outline: 'none', flex: 1, backgroundColor: 'white', fontSize: '14px', color: '#333' },
  searchBtn: { backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '0 25px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' },
  tableContainer: { display: 'flex', flexDirection: 'column' },
  tableHeader: { padding: '10px 20px', display: 'flex', color: '#2196F3', fontWeight: 'bold', fontSize: '13px' },
  tableRow: { backgroundColor: 'white', padding: '15px 20px', display: 'flex', alignItems: 'center', borderRadius: '4px', marginBottom: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cellNom: { flex: 2.5 },
  cellDate: { flex: 2 },
  cellHeure: { flex: 2 },
  cellAction: { width: '20px' },
  cellNomText: { flex: 2.5, fontSize: '14px', fontWeight: 'bold', color: '#333' },
  cellDateText: { flex: 2, fontSize: '14px', color: '#444' },
  cellHeureText: { flex: 2, fontSize: '13px', color: '#666' },
  cellActionArrow: { width: '20px', color: '#2196F3', fontSize: '20px', textAlign: 'right' }
};