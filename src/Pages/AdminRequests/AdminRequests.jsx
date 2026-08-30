 

import {
  Bell,
  ChevronDown,
  Home,
  CalendarDays,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  Search,
  SlidersHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./AdminRequests.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../axiosClient/axios.js"
import AdminRequestDetail from "../AdminRequestDetail/AdminRequestDetail";
import { daysBetween } from "../../util/day.js";


 


function SidebarItem({ icon, children, active }) {
  return (
    <div className={`admin-sidebar-item ${active ? "active" : ""}`}>

      {icon}

      <span>{children}</span>

      {active && (
        <div className="admin-active-indicator" />
      )}

    </div>
  );
}


function AdminRequests( ) {

  
  const [activeTab, setActiveTab] = useState("Toutes");

  const [search, setSearch] = useState("");
 const [show,setshow] =useState(false)
 
  const [requestPending,setrequestPending]  = useState([])
  const Nav = useNavigate()
  const url = useParams()
 
  const tabs = [
   
    "En attente",
    
    
  ];


  const filteredRequests = requestPending?.filter((request) => {

    const matchesSearch =
      request.nom
        .toLowerCase()
        .includes(search.toLowerCase())  
   

    let matchesTab = true;

    if (activeTab === "En attente") {
      matchesTab = request.statusType === "pending";
    }

    if (activeTab === "Approuvées") {
      matchesTab = request.statusType === "approved";
    }

    if (activeTab === "Refusées") {
      matchesTab = request.statusType === "rejected";
    }

    return matchesSearch && matchesTab;
  });

  
useEffect(()=>{
  const getcong = async ()=>{
      const getConge = await axios.post("holiday/seeConge/v1",{
        "roomId":url.roomId

      })
     
      if(getConge.status==200){
       
        setrequestPending(getConge.data)
      }
 
  }
  getcong()
},[])

const [currentuser,Setcurrentuser] = useState({})

const [CurrentRoles,setCurrentRoles] = useState("user")


     useEffect(()=>{
      const fetchOrganization = async () =>{
       const response = await axios.post("/ogranization/getSpecOrganization/v1",{
          "roomId":url.roomId
      })
        
     
       if(response.status==200){
       
        setCurrentRoles(response.data.res)

              
         
  
      
        
         
       
       }
        
      }
      fetchOrganization()
     },[])


  return (

    <div className="admin-dashboard">

 
  {
    show &&  
    <AdminRequestDetail currentrole={CurrentRoles}  f2help={(data)=>setrequestPending(data)} data={currentuser} fhelp={()=>setshow(false)}  /> 
  }

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="admin-topbar">

        <div className="admin-brand">

          <div className="admin-brand-logo">
            <span  style={{cursor:"pointer"}} onClick={()=>Nav("/organizations")}>STIR</span>
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

            <span>{requestPending?.length}</span>

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
             
                      {CurrentRoles.includes("admin")? 
              CurrentRoles.includes("admin") &&CurrentRoles.substr(CurrentRoles.indexOf("-")+1,CurrentRoles?.length)
              : CurrentRoles}   
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


        <div onClick={()=>Nav(`/organizations/${url.roomId}`)}>
          <SidebarItem
                    icon={<Home size={19} />}
                  >
                
                    <h3 >   Tableau de bord</h3>
                  </SidebarItem>


        </div>
        
        

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


        <div className="admin-sidebar-bottom" onClick={()=>Nav("/login")}>

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

      <main className="admin-main">


        <section className="admin-page-header">

          <h1>
            Demandes de congé
          </h1>

          <p>
            Gérez les demandes de congé des employés
          </p>

        </section>


        {/* ===================================================
            CONTENT CARD
        =================================================== */}

        <section className="requests-container">


          {/* TOP CONTROLS */}

          <div className="requests-toolbar">


            {/* TABS */}

            <div className="request-tabs">

              {tabs.map((tab) => (

                <button
                  key={tab}
                  className={
                    activeTab === tab
                      ? "request-tab active"
                      : "request-tab"
                  }
                  onClick={() => setActiveTab(tab)}
                >

                  {tab}

                </button>

              ))}

            </div>


            {/* SEARCH + FILTER */}

            <div className="request-actions">


              <div className="search-box">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>


              

            </div>

          </div>


          {/* =================================================
              TABLE
          ================================================= */}

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Employé
                  </th>

                  <th>
                    nombre de jour
                  </th>

                 

                  <th>
                    Date demande
                  </th>

                  <th>
                    Statut
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredRequests.map((request) => (

                  <tr key={request.cin}>


                    {/* EMPLOYEE */}

                    <td>

                      <div className="employee-cell">

                        <div className="employee-avatar">
                           👨🏻 
                        </div>

                        <span style={{fontSize:"13px"}}>
                          {request.nom}

                          {/* <span style={{color:"red"}}>ID {request.cin}</span> */}
                        
                        </span>

                      </div>

                    </td>


                    {/* PERIOD */}

                    <td>
                      <span style={{marginLeft:"25px"}}>{daysBetween(request.debut,request.fin)}</span>
                    </td>


                    {/* TYPE */}
 


                    {/* DATE */}

                    <td>
                      {request.datedemande.substr(0,request.datedemande.indexOf("T")).replaceAll("-","/")}
                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`admin-status  pending`}
                      > 
                 
                         En attente

                      </span>

                    </td>


                    {/* ACTION */}

                    <td style={{display:"flex",alignItems:"center"}} onClick={()=>Setcurrentuser(request)}>

                      <button
                        className="view-request"
                        title="Voir la demande"
                        
                      >

                        <Eye size={20} onClick={()=>setshow(true)} />
                      
                       </button>
{/* 
                             <button
                        className="view-request"
                        title="Voir la demande"
                      >

                       <X size={20} style={{color:"red"}} />
                       </button>



      <button
                        className="view-request"
                        title="Voir la demande"
                      >

                        <Check size={20} style={{color:"green"}}/>
                      
                       </button> */}




                       


                    </td>

                  </tr>

                ))}


                {filteredRequests.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      className="empty-table"
                    >
                      Aucune demande trouvée
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

       


        </section>

      </main>

    </div>
  );
}


export default AdminRequests;