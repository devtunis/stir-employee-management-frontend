import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useStoreauth } from "../useStore/UseStoreContext";
import axios from "../axiosClient/axios.js";
import { Building2, Building2Icon, LogOut, User } from "lucide-react";
import JoinRoom from "../JoinRoom/JoinRoom.jsx";

const organizations = [
  { id: "ORG-0001", name: "Raffinage Nord", owner: "Ahmed Ben Ali", date: "12/03/2023" },
  { id: "ORG-0002", name: "Maintenance Industrielle", owner: "Fatma Zahra", date: "18/04/2023" },
  { id: "ORG-0003", name: "Laboratoire Central", owner: "Karim Hached", date: "22/05/2023" },
  { id: "ORG-0004", name: "Sécurité & Environnement", owner: "Mohamed Salah", date: "01/06/2023" },
  { id: "ORG-0005", name: "Logistique & Approvisionnement", owner: "Ines Trabelsi", date: "15/06/2023" },
  { id: "ORG-0006", name: "Ressources Humaines", owner: "Youssef Bouazizi", date: "20/07/2023" },
  { id: "ORG-0007", name: "Direction Technique", owner: "Sami Gharbi", date: "03/08/2023" },
  { id: "ORG-0008", name: "Informatique & Digital", owner: "Nadia Mansour", date: "17/08/2023" },
  { id: "ORG-0009", name: "Achats & Marchés", owner: "Walid Jaziri", date: "02/09/2023" },
  { id: "ORG-0010", name: "Production", owner: "Amine Kallel", date: "11/09/2023" },
  { id: "ORG-0011", name: "Qualité", owner: "Sonia Ben Amor", date: "28/09/2023" },
  { id: "ORG-0012", name: "Finance", owner: "Hichem Saidi", date: "10/10/2023" },
];

const Icon = ({ name, size = 18 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    building: <><path d="M4 21V7l8-4 8 4v14" /><path d="M8 21v-5h3v5M13 21v-5h3v5" /><path d="M8 9h.01M12 9h.01M16 9h.01M8 12h.01M12 12h.01M16 12h.01" /></>,
    user: <><circle cx="12" cy="7.5" r="3.2" /><path d="M5.5 20c.7-3.7 3-5.5 6.5-5.5s5.8 1.8 6.5 5.5" /></>,
    calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7 3v4M17 3v4M3.5 9h17" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h13" /><path d="m14 7 5 5-5 5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
};

const Social = ({ children }) => <span className="social-dot">{children}</span>;





























const Home = () => {
  const {state}  = useStoreauth()
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showJoinRoom,SetshowJoinRoom]= useState(false)
 

  const Nav = useNavigate()

 
 const [Organisations,setOrganisations] = useState([])
  
  useEffect(()=>{
        if(state.cin){
           const LoadigOrgaizations = async()=>{
            const Response = await axios("/seefollowOrg/v1")
            
            setOrganisations(Response.data.reverse())
           }
           LoadigOrgaizations()
        }
  },[state.cin])

 

  const filtered = Organisations?.filter((org) => org.nameOrganization.toLowerCase().includes(query.toLowerCase()));
  
  return (

    <> 
    {
      showJoinRoom &&  <JoinRoom setshowfalse={()=>SetshowJoinRoom(false)}/>
    }
   
    <div className="sitr-page">
      <header className="top-header">
        <div className="header-inner">
          <img className="sitr-logo" src="/homePictuer/sitr-logo.png" alt="STIR - Société Tunisienne des Industries de Raffinage" />

          <div className="header-actions">
            <div className="socials">
              <Social>f</Social>
              <Social>♥</Social>
              <Social>8+</Social>
              <Social>in</Social>
              <Social>▶</Social>
            </div>
            <div className="language-switch">
              <span>EN</span>
              <span>AR</span>
            </div>
            <Social><Icon name="mail" size={14} /></Social>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="nav-inner">
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <Icon name="menu" />
          </button>

          <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
            <span className="active" ><Icon name="home" size={15} />  Accueil</span> 
            <span  >Présentation de la société</span>
            <span  >Activités et Produits</span>
            <span  >Centre de Formation et Stage</span>
            <span >École du Feu</span>
            <span  >Laboratoire</span>
            <span  >Partenaires</span>
            <span  >Attestation de présence.</span>
            <span  onClick={()=>Nav("/login")} ><LogOut size={15}/> déconnexion</span>
           
          </div>

          <div className="nav-search">
            <input placeholder="Recherche"   onInput={(e) => setQuery(e.target.value)} />
            <Icon name="search" size={15} />
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-photo" />
        <div className="hero-blue-shape" />
        <div className="hero-content">
          <div className="hero-icon"><Icon name="building" size={35} /></div>
          <div>
            <div className="red-line" />
            <h1>Departments</h1>
            <p>Gérez et consultez toutes les organisations enregistrées.</p>
          </div>
        </div>
      </section>

      <main className="content-wrap">
        <section className="organizations-panel">
          <div className="panel-toolbar">
            <div className="panel-title">
              <Icon name="building" size={20} />
              <strong>Liste des organisations</strong>
              <span className="separator" />
              <span className="total">Total : {Organisations.length} organisations</span>
            </div>

            <div className="toolbar-actions">
              <label className="org-search">
                <input
                  value={query}
                  onInput={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher une organisation..."
                />
                <Icon name="search" size={16} />
              </label>

                 <button className="new-button" onClick={()=>SetshowJoinRoom((p)=>!p)}>
                <Building2Icon name="plus" size={18} />
                Join Organization
              </button>


              <button className="new-button" onClick={()=>Nav("/organizations/createOrganization")}>
                <Icon name="plus" size={18} />
                Nouvelle department
              </button>
            
            </div>
          </div>

          <div className="org-grid">
            {filtered.map((org) => (
              <article className="org-card" key={org.roomId}>
                <div className="card-top">
                  <div className="org-icon"><Icon name="building" size={27} /></div>
                  <span className={`org-id ${org.ownerId==state.cin  && "special"}`} >ID: {org.roomId}</span>
                </div>

                <h2>{org.name}</h2>

                <div className="meta" >
                  <span style={{fontWeight:"bold"}}><Building2  name="user" size={13} /> department : {org.nameOrganization}</span>
                  <span ><Icon name="calendar" size={13} /> Créée le : {org.updatedAt.substr(0,org.updatedAt.indexOf("T")).replaceAll("-","/")}</span>
                </div>

                <button  onClick={()=>Nav(`/organizations/${org.roomId}`)} className="details-button"> 
                  Voir les détails
                  <Icon name="arrow" size={16} />
                </button>


                
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">Aucune organisation trouvée.</div>
          )}
        </section>
      </main>
    </div>

      </>
  );
};

export default Home;
