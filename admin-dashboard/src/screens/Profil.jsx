import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Zidna el import hadha

export default function Profil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State lil loading mta3 el enregistrement

  // 1. Les states mta3 les inputs kol mfarzin s7a7
  const [formData, setFormData] = useState({
    nom: '', prenom: '', type_contrat: '', numero_employe: '',
    date_naissance: '', date_recrutement: '', genre: '', etat_civil: '',
    fonction: '', telephone_professionnel: '', description: '',
    adresse: '', code_postal: '', ville: '', autre_telephone: '', email: '',
    nom_contact_urgence: '', lien_contact_urgence: '', telephone_urgence: ''
  });

  // 2. El function eli t-baddel el state kol ma t-ektheb fi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. El function eli t-sob el data fi table profil_employes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('profil_employes')
      .insert([formData]);

    setLoading(false);

    if (error) {
      alert("Erreur lors de l'enregistrement: " + error.message);
    } else {
      alert("Profil enregistré avec succès !");
      // Tfarregh el formulaire ba3d el khedma
      setFormData({
        nom: '', prenom: '', type_contrat: '', numero_employe: '',
        date_naissance: '', date_recrutement: '', genre: '', etat_civil: '',
        fonction: '', telephone_professionnel: '', description: '',
        adresse: '', code_postal: '', ville: '', autre_telephone: '', email: '',
        nom_contact_urgence: '', lien_contact_urgence: '', telephone_urgence: ''
      });
    }
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <img src="/logo.png" alt="Logo" style={styles.logoImage} />
        </div>
        
        <nav style={styles.nav}>
          <div style={styles.navItem} onClick={() => navigate('/home')}>📊 MON TABLEAU DE BORD</div>
          <div style={styles.navItemActive} onClick={() => navigate('/profil')}>👤 MON PROFIL</div>
          <div style={styles.navItem} onClick={() => navigate('/fiche-pointage')}>📅 MA FICHE DE POINTAGE</div>
          <div style={styles.navItem} onClick={() => navigate('/equipes')}>👥 MES ÉQUIPES</div>
          <div style={styles.navItem} onClick={() => navigate('/creer-equipe')}>👥 CRÉER ÉQUIPES</div>
          <div style={styles.navItem}>🗓️ MON PLANNING</div>
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.logout} onClick={() => navigate('/')}>🚪 DÉCONNEXION</div>
          <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {/* HEADER BAR */}
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>LAVANCE-</h2>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>👤</div>
            <span>Username ▾</span>
          </div>
        </header>

        <div style={styles.content}>
          {/* 4. Rbadna el layout b-form tag bch ye9bel el submit */}
          <form onSubmit={handleSubmit} style={styles.formLayout}>
            
            {/* COLONNE GAUCHE */}
            <div style={styles.leftColumn}>
              {/* SECTION INFORMATION PERSONNEL */}
              <section style={styles.card}>
                <h3 style={styles.sectionTitle}>INFORMATION PERSONNEL</h3>
                
                <div style={styles.row}>
                  <div style={styles.flexField}>
                    <label style={styles.label}>NOM</label>
                    <input style={styles.input} name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom de l'employé" required />
                  </div>
                  <div style={styles.flexField}>
                    <label style={styles.label}>PRÉNOM</label>
                    <input style={styles.input} name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom de l'employé" required />
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.flexField}>
                    <label style={styles.label}>TYPE DE CONTRAT</label>
                    <input style={styles.input} name="type_contrat" value={formData.type_contrat} onChange={handleChange} placeholder="Type" />
                  </div>
                  <div style={styles.flexField}>
                    <label style={styles.label}>NUMÉRO DE L'EMPLOYÉ</label>
                    <input style={styles.input} name="numero_employe" value={formData.numero_employe} onChange={handleChange} placeholder="+216 XXXXXXXX" />
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.flexField}>
                    <label style={styles.label}>DATE DE NAISSANCE</label>
                    <input type="date" style={styles.input} name="date_naissance" value={formData.date_naissance} onChange={handleChange} />
                  </div>
                  <div style={styles.flexField}>
                    <label style={styles.label}>DATE DE RECRUTEMENT</label>
                    <input type="date" style={styles.input} name="date_recrutement" value={formData.date_recrutement} onChange={handleChange} />
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.flexField}>
                    <label style={styles.label}>GENRE</label>
                    <input style={styles.input} name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
                  </div>
                  <div style={styles.flexField}>
                    <label style={styles.label}>ÉTAT CIVIL</label>
                    <input style={styles.input} name="etat_civil" value={formData.etat_civil} onChange={handleChange} placeholder="Etat civil" />
                  </div>
                </div>
              </section>

              {/* SECTION INFORMATION PUBLIQUE */}
              <section style={styles.card}>
                <h3 style={styles.sectionTitle}>INFORMATION PUBLIQUE</h3>
                <div style={styles.row}>
                  <div style={styles.flexField}>
                    <label style={styles.label}>FONCTION</label>
                    <input style={styles.input} name="fonction" value={formData.fonction} onChange={handleChange} placeholder="Fonction de l'employé" />
                  </div>
                  <div style={styles.flexField}>
                    <label style={styles.label}>TÉLÉPHONE PROFESSIONNEL</label>
                    <input style={styles.input} name="telephone_professionnel" value={formData.telephone_professionnel} onChange={handleChange} placeholder="+216 XXXXXXXX" />
                  </div>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>DESCRIPTION</label>
                  <textarea style={styles.textarea} name="description" value={formData.description} onChange={handleChange} placeholder="..."></textarea>
                </div>
              </section>
            </div>

            {/* COLONNE DROITE */}
            <div style={styles.rightColumn}>
              <section style={styles.card}>
                <h3 style={styles.sectionTitle}>COORDONNÉES</h3>
                
                <div style={styles.field}>
                  <label style={styles.label}>ADRESSE</label>
                  <input style={styles.input} name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" />
                </div>

                <div style={styles.row}>
                  <div style={styles.flexField}>
                    <label style={styles.label}>CODE POSTAL</label>
                    <input style={styles.input} name="code_postal" value={formData.code_postal} onChange={handleChange} placeholder="Code postal" />
                  </div>
                  <div style={styles.flexField}>
                    <label style={styles.label}>VILLE</label>
                    <input style={styles.input} name="ville" value={formData.ville} onChange={handleChange} placeholder="Ville" />
                  </div>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>AUTRE TÉLÉPHONE</label>
                  <input style={styles.input} name="autre_telephone" value={formData.autre_telephone} onChange={handleChange} placeholder="+216 XXXXXXXX" />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>EMAIL</label>
                  <input type="email" style={styles.input} name="email" value={formData.email} onChange={handleChange} placeholder="Email de l'employé" />
                </div>

                <div style={styles.row}>
                  <div style={{...styles.flexField, flex: 2}}>
                    <label style={styles.label}>CONTACT D'URGENCE</label>
                    <input style={styles.input} name="nom_contact_urgence" value={formData.nom_contact_urgence} onChange={handleChange} placeholder="Nom du contact" />
                  </div>
                  <div style={styles.flexField}>
                    <label style={{...styles.label, color: 'transparent'}}>.</label>
                    <input style={styles.input} name="lien_contact_urgence" value={formData.lien_contact_urgence} onChange={handleChange} placeholder="Lien du contact" />
                  </div>
                </div>

                <div style={styles.field}>
                  <input style={styles.input} name="telephone_urgence" value={formData.telephone_urgence} onChange={handleChange} placeholder="+216 XXXXXXXX" />
                </div>
              </section>

              {/* BOUTON BLEU EN BAS À DROITE */}
              <button type="submit" disabled={loading} style={styles.planningButton}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F0F7FF',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#2196F3',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    zIndex: 100,
  },
  logoSection: {
    padding: '20px',
    textAlign: 'center',
  },
  logoImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  nav: {
    flex: 1,
    marginTop: '20px',
  },
  navItem: {
    padding: '12px 20px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  navItemActive: {
    padding: '12px 20px',
    fontSize: '11px',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sidebarFooter: {
    padding: '20px',
  },
  logout: {
    fontSize: '10px',
    fontWeight: 'bold',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  backButton: {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '8px',
    width: '35px',
    height: '35px',
    color: '#2196F3',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    marginLeft: '240px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '60px',
    backgroundColor: '#64B5F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    color: 'white',
  },
  headerTitle: {
    fontSize: '20px',
    margin: 0,
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userAvatar: {
    backgroundColor: 'white',
    color: '#64B5F6',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: '40px',
  },
  formLayout: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    border: '1px solid #BBDEFB',
    borderRadius: '4px',
    padding: '25px',
  },
  sectionTitle: {
    color: '#2196F3',
    fontSize: '16px',
    marginTop: 0,
    marginBottom: '25px',
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  field: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  flexField: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#2196F3',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  input: {
    padding: '12px',
    border: '1px solid #BBDEFB',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#64B5F6',
    backgroundColor: '#FBFDFF',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    border: '1px solid #BBDEFB',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#64B5F6',
    height: '120px',
    backgroundColor: '#FBFDFF',
    resize: 'none',
    outline: 'none',
  },
  planningButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '13px',
    width: '100%',
    marginTop: '10px',
  },
};