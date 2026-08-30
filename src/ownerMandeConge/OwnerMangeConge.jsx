 


import {
  Bell,
  ChevronDown,
  Home,
  CalendarDays,
  LogOut,
  Search,
  Eye,
} from "lucide-react";

import "./OwnerMangeConge.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { use } from "../axiosClient/usehook";
import { useState } from "react";
import { daysBetween } from "../../../b/util/daysBetween";


function SidebarItem({ icon, children, active }) {
  return (
    <div className={`admin-sidebar-item ${active ? "active" : ""}`}>
      {icon}

      <span>{children}</span>

      {active && <div className="admin-active-indicator" />}
    </div>
  );
}


function OwnerMangeConge() {

  // extract the id from the url  using useparams

  const {roomid} = useParams()
  const [holidays,setholidays] = useState([])
  
  useEffect(()=>{
    const FetchHolidayRequests = async()=>{
      const {error,data} =await use("/ownerccess/conge/v1","post",{"roomId":roomid })
      if(error){
        console.log(error)
        return
      }
      setholidays(data.data)
      console.log(data.data)
    }
    FetchHolidayRequests()
  },[])

  const handleAccept =async (data)=>{
    const accept = await use("/holiday/approveConge/v1","post",
       {
                "roomId":data.roomId,
              "cin":data.cin,
              "answer":true,
              "reason":"owner",
              "nbjr": daysBetween(data.debut,data.fin),
              "nom":data.nom,
              "debut":data.debut,
              "fin":data.fin,
              "typeConge":data.typeConge,
              "datedemande":data.datedemande,
              "reasonrefu":"just joking"
              
      
              }

    )
    console.log(accept)
setholidays(accept.data.data.pull.request_holiday)


  }
 
  const handleRefuse = async (data)=>{

       let reasonRefuse = prompt("donner reason")
        while(!reasonRefuse){
              reasonRefuse = prompt("you forget the rason")
              
        }
        

        let custom = ` Refusé par owner pour le motif suivant [ ${reasonRefuse}]`

         const ResponseApproveRequest = await use("/holiday/approveConge/v1","post",

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
        
     setholidays(ResponseApproveRequest.data.data.pull.request_holiday)


      
       



  }

  const Nav = useNavigate()
  return (
    <div className="admin-dashboard">

      {/* ================= HEADER ================= */}

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


      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        <div className="admin-menu-title">
          MENU ADMIN
        </div>


        <nav className="admin-navigation">

          <SidebarItem
            icon={<Home size={19} />}
          >
            <h3>Tableau de bord</h3>
          </SidebarItem>


          <SidebarItem
            active
            icon={<CalendarDays size={19} />}
          >
            Demandes de congé
          </SidebarItem>

        </nav>


        <div className="admin-sidebar-bottom" onClick={()=>Nav("/login")}>

          <SidebarItem
            icon={<LogOut size={19} />}
          >
            Déconnexion
          </SidebarItem>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="admin-main">

        <section className="admin-page-header">

          <h1>
            Demandes de congé
          </h1>

          <p>
            Gérez les demandes de congé des employés
          </p>

        </section>


        {/* ================= CONTENT ================= */}

        <section className="requests-container">


          {/* ================= TOOLBAR ================= */}

          <div className="requests-toolbar">

            <div className="request-tabs">

              <button className="request-tab active">
                En attente
              </button>

            </div>


            <div className="request-actions">

              <div className="search-box">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Rechercher..."
                />

              </div>

            </div>

          </div>


          {/* ================= TABLE ================= */}

       <div className="holiday-cards-container">
  {holidays.map((item, index) => {
    const isSeen = item.seen === true;

    return (
      <div
        key={item.datedemande || index}
        className={`holiday-card ${isSeen ? "seen" : "unseen"}`}
      >

      

        {/* Header */}
        <div className="holiday-card-header">
          <div className="employee-info">

            <div className="employee-avatar">
              {item.nom?.charAt(0)?.toUpperCase() || "E"}
            </div>

            <div>
              <h3>{item.nom}</h3>

              <span className="cin">
                CIN : {item.cin}
              </span>
            </div>

          </div>

          {
            item.seen ? <span className="admin-status approved">
            <h2>seen</h2>
          </span>  : <span className="admin-status pending">
            En attente
          </span>
          }
        </div>


        {/* Information */}
        <div className="holiday-card-content">

          <div className="info-item">
            <span className="info-label">
              Type de congé
            </span>

            <strong>
              {item.typeConge}
            </strong>
          </div>


          <div className="info-item">
            <span className="info-label">
              Période
            </span>

            <strong>
              {item.debut} → {item.fin}
            </strong>
          </div>


          <div className="info-item">
            <span className="info-label">
              Date de demande
            </span>

            <strong>
              {new Date(item.datedemande).toLocaleDateString("fr-FR")}
            </strong>
          </div>

        </div>


        {/* Reason */}
        <div className="holiday-reason">

          <span className="info-label">
            Motif
          </span>

          <p>
            {item.reason || "Aucun motif indiqué"}
          </p>

        </div>


        {/* Actions */}
     

        {
          !item.seen &&      <div className="holiday-card-actions">

          <button
            className="holiday-btn refuse"
            onClick={() => handleRefuse(item)}
          >
            Refuser
          </button>

          <button
            className="holiday-btn accept"
            onClick={() => handleAccept(item)}
          >
            Accepter
          </button>

        </div> 
        }

      </div>
    );
  })}
</div>
        </section>

      </main>

    </div>
  );
}


export default OwnerMangeConge;

