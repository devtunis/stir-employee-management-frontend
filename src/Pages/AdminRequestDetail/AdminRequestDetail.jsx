 

import {
  Bell,
  ChevronDown,
  Home,
  CalendarDays,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  ArrowLeft,
  Check,
  X,
 
  CalendarDays as CalendarIcon,
} from "lucide-react";

import "./AdminRequestDetail.css";
import { useEffect } from "react";
import axios from "../../../axiosClient/axios";
import SimpleLoader from "../../Component/SimpleLoader";
import { useState } from "react";
import { useStoreauth } from "../../useStore/UseStoreContext";
import { daysBetween } from "../../util/day.js";
import Lodaer from "../../Component/Lodaer.jsx";
import STIRLoader from "../../Component/StirLoader.jsx";

function SidebarItem({ icon, children, active }) {
  return (
    <div
      className={`admin-sidebar-item ${
        active ? "active" : ""
      }`}
    >
      {icon}

      <span>{children}</span>

      {active && (
        <div className="admin-active-indicator" />
      )}
    </div>
  );
}



//react 

function AdminRequestDetail({fhelp , data,f2help ,currentrole}) {

   

      const [pload,setpload] = useState(false)
      const [Lodaersimple,setLodaersimple] = useState(false)   
      const [donne,setdonne] =useState({})
  
      useEffect(()=>{
        setpload(true)
        
        const fetchallPrivateDate =async ()=>{
          try{
          const response = await axios.post("/more_info_about_user/v1",
            {
            "roomId":data.roomId,
            "cin":data.cin
          }

          )
          
          setdonne(response?.data.info)
          }
        catch(err){
          console.log(err)
        }
        finally {
          setpload(false)
        }
        }
        fetchallPrivateDate()
      },[])

 

 

  

      // handel accept request 
      const Approuver = async ()=>{

          setLodaersimple(true)
      try{

    

      const ResponseApproveRequest = await axios.post("/holiday/approveConge/v1",
        {
          "roomId":data.roomId,
        "cin":data.cin,
        "answer":true,
        "reason":data.reason,
        "nbjr": daysBetween(data.debut,data.fin),
        "nom":data.nom,
        "debut":data.debut,
        "fin":data.fin,
        "typeConge":data.typeConge,
        "datedemande":data.datedemande,
        "reasonrefu":"just joking"
        

        }
      )
      console.log(ResponseApproveRequest)
      f2help(ResponseApproveRequest.data.res)
      fhelp()
    }catch(err){
      console.log(err.response)
    }
    finally {
      setLodaersimple(false)
    }
    }

      const Refuse = async ()=>{

          setLodaersimple(true)
          
      try{
        let reasonRefuse = prompt("donner reason")
        while(!reasonRefuse){
              reasonRefuse = prompt("you forget the rason")
              
        }
        
        let custom = ` Refusé par ${currentrole.substr(currentrole.indexOf("-")+1,currentrole.length)} pour le motif suivant [ ${reasonRefuse}]`
          
    
          const ResponseApproveRequest = await axios.post("/holiday/approveConge/v1",
            {
            "roomId":data.roomId,
            "cin":data.cin,
            "answer":false,
            "reason":data.reason,
            "nom":data.nom,
            "debut":data.debut,
            "fin":data.fin,
            "typeConge":data.typeConge,
            "datedemande":data.datedemande,
            "reasonrefu": custom
            
        }


     


      
      )
      console.log(ResponseApproveRequest)
      f2help(ResponseApproveRequest.data.res)
      fhelp()
    }catch(err){
      console.log(err.response)
    }
    finally {
      setLodaersimple(false)
    }
    }



  return (
    <div className="admin-detail-dashboard">
      
      {/* =====================================================
          TOPBAR
      ===================================================== */}
  
     {
      pload &&    <Lodaer/>
     }
      <header className="admin-topbar">

        <div className="admin-brand">

          <div className="admin-brand-logo">
            <span>STIR</span>
          </div>

          <div className="admin-brand-text">
            <strong>
              Société Tunisienne des
            </strong>

            <span>
              Industries de Raffinage
            </span>
          </div>

        </div>


        <div className="admin-header-right">

          <div className="admin-notification">

            <Bell
              size={22}
              strokeWidth={1.8}
            />

            <span>3</span>

          </div>


          <div className="admin-user-menu">

            <div className="admin-avatar">
              👨🏻
            </div>

            <div className="admin-user-info">

              <strong>
                Ahmed Ben Ali
              </strong>

              <span>
                Administrateur
              </span>

            </div>

            <ChevronDown size={17} />

          </div>

        </div>

      </header>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="admin-sidebar">

        <div className="admin-menu-title">
          MENU ADMIN
        </div>


        <nav className="admin-navigation">

          <SidebarItem
            icon={<Home size={19} />}
          >
            Tableau de bord
          </SidebarItem>


          <SidebarItem
            active
            icon={<CalendarDays size={19} />}
          >
            Demandes de congé
          </SidebarItem>


          <SidebarItem
            icon={<Users size={19} />}
          >
            Utilisateurs
          </SidebarItem>


          <SidebarItem
            icon={<FileBarChart size={19} />}
          >
            Rapports
          </SidebarItem>


          <SidebarItem
            icon={<Settings size={19} />}
          >
            Paramètres
          </SidebarItem>

        </nav>


        <div className="admin-sidebar-bottom">

          <SidebarItem
            icon={<LogOut size={19} />}
          >
            Déconnexion
          </SidebarItem>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-detail-main">


        {/* BACK */}

        <button className="back-to-list" onClick={()=>fhelp()}>

          <ArrowLeft size={15} />

          <span >
            Retour à la liste
          </span>

        </button>


        {/* TITLE */}

        <section className="detail-page-header">

          <h1>
            Détail de la demande
          </h1>

        </section>


        {/* =================================================
            INFORMATION CARDS
        ================================================= */}

        <div className="detail-information-grid">


          {/* =================================================
              REQUEST INFORMATION
          ================================================= */}

          <section className="detail-card request-information">

            <div className="detail-card-header">

              <h2>
                Informations de la demande
              </h2>

            </div>


            <div className="detail-fields">


              <div className="detail-field">

                <span className="detail-label">
                  Employé
                </span>

                <strong>
                  {data.nom ? data.nom : "user"}
                </strong>

              </div>


              <div className="detail-field">

                <span className="detail-label">
                 CIN  Employé
                </span>

                <strong>
                  {data.cin ? data.cin : "99999999"}
                </strong>

              </div>



              <div className="detail-field">

                <span className="detail-label">
                  Type de congé
                </span>

                <strong>
                  {data.typeConge}
                </strong>

              </div>


              <div className="detail-field">

                <span className="detail-label">
                  Période
                </span>

                <strong style={{fontWeight:"bold"}}>
                 {data.debut} - {data.fin} ({ daysBetween(data.debut,data.fin)} jours)

                </strong>

              </div>


              <div className="detail-field">

                <span className="detail-label">
                  Date de demande
                </span>

                <strong>
                 {data.datedemande.substr(0,data.datedemande.indexOf("T")).replaceAll("-","/")}
                </strong>

              </div>


              <div className="detail-field reason-field">

                <span className="detail-label">
                  Motif
                </span>

                <strong>
                  {data.reason}
                </strong>

              </div>


              <div className="detail-field status-field">

                <span className="detail-label">
                  Statut actuel
                </span>

                <span className="detail-current-status">
                  <Check size={12} />
                  En attente
                </span>

              </div>

            </div>

          </section>


          {/* =================================================
              EMPLOYEE INFORMATION
          ================================================= */}

          <section className="detail-card employee-information">

            <div className="detail-card-header">

              <h2>
                Informations de l'employé
              </h2>

            </div>


            <div className="detail-fields">


              <div className="detail-field">

                <span className="detail-label">
                  nom
                </span>

                <strong>
                  {data.nom}
                </strong>

              </div>


           

             

              <div className="detail-field">

                <span className="detail-label">
                  Email
                </span>

                <strong>
                  {data.nom}.@stir.com.tn
                </strong>

              </div>


              <div className="detail-field">

                <span className="detail-label">
                  Téléphone
                </span>

                <strong>
                  22 123 456
                </strong>

              </div>

            <div className="detail-field">

                <span className="detail-label">
                  cin
                </span>

                <strong>
                  {data.cin}
                </strong>

              </div>

     <div className="detail-field">

                <span className="detail-label">
                  Solde congés restants
                </span>

                <strong>
                 
                 { daysBetween(data.debut,data.fin)>donne.conge ?
                 <>
                  <h3 style={{color:"red"}}> {donne.conge}</h3> 
                 </>
                 
                  
                  : <h3 style={{color:"green"}}> {donne.conge}</h3> }
                </strong>

              </div>

 
 

 {donne.conge - daysBetween(data.debut,data.fin) <0
   && 
 

     <div className="detail-field">

                <span className="detail-label" style={{color:"red"}}>
                   ⚠ Solde insuffisant de  
                </span>

                <strong style={{color:"red"}}>
                -{ daysBetween(data.debut,data.fin)-donne.conge} jours     
                </strong>

   </div>

  }










            </div>




          </section>

        </div>

{
  Lodaersimple && <SimpleLoader />
}
        {/* =================================================
            ACTIONS
        ================================================= */}

        <section className="detail-actions-card">

          <h2>
            Actions
          </h2>


          <div className="detail-action-buttons">

            <button className="approve-request" onClick={()=>Approuver()}>

              <Check size={16} />

              <span >
                Approuver la demande
              </span>

            </button>


            <button className="refuse-request" onClick={()=>Refuse()}>

              <X size={16} />

              <span>
                Refuser la demande
              </span>

            </button>

          </div>

        </section>


      </main>

    </div>
  );
}


export default AdminRequestDetail;