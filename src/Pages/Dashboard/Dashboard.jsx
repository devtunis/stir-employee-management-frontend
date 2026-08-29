 
import {
  Bell,
  ChevronDown,
  Home,
  CalendarDays,
  LogOut,
  Building2,
  Wallet,
  Send,
  Phone,
  Mail,
  ArrowRight,
  CheckLineIcon,
  User,
  UserCheck,
  Award,
} from "lucide-react";

import "./Dashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreauth } from "../../useStore/UseStoreContext";
import { useEffect, useState } from "react";
import axios from "../../axiosClient/axios.js"
import SimpleLoader from "../../Component/SimpleLoader.jsx";
 
import Lodaer from "../../Component/Lodaer.jsx";
import { ToastContainer, toast } from 'react-toastify';


 
import "@daypicker/react/style.css";
 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RefusedLeaveModal from "../../Component/RefusedLeaveModal.jsx";
import { daysBetween } from "../../util/day.js";

 
 

 
import AdminStructure from "../AdminStructure/AdminStructure.jsx";
import CertifConge from "../../CertifConge/CertifConge.jsx";
 

 
function StatCard({
  title,
  value,
  suffix,
  description,
  icon,
  type = "blue",
}) {
  


  return (
    <div className="stat-card">
      <div className="stat-content">
        <span className="stat-title">{title}</span>

        <div className="stat-value">
          {title=="Demande actuellement chez"? 
          value?.includes("admin") ? value.substr(value.indexOf("-")+1,value.length):value
          
          : value}
          {suffix && <span>{suffix}</span>}
        </div>

        <span className="stat-description">{description=="En cours de traitement"? 
     
      
        value!="no request Pending" &&(  <h4 className="en-cours-de-traitement">{description}</h4>) 

        :description}</span>
        
      </div>

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>
    </div>
  );
}

function SidebarItem({ icon, children, active }) {
  return (
    <div className={`sidebar-item ${active ? "active" : ""}`}>
      {icon}
      <span>{children}</span>

      {active && <div className="active-indicator" />}
    </div>
  );
}

function Dashboard() {
 


 const [showM,setShowM] = useState(false)


  const [__showDashAdmin,__setDashAdmin] = useState(()=>JSON.parse(localStorage.getItem("showDadming"))  || false )


  const [loaders,setLoaders] = useState(false)

  const notify = () => toast.error('Vous avez une demande en attente. ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
            });

     const notify2 = () => toast.error('Veuillez remplir les champs manquants.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
            });

      const notify3 = ()=> toast.success('Votre demande de congé a été envoyée !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                 
                });

     const Nav = useNavigate()
     const {state}  = useStoreauth()
     const url  = useParams()
     const [owner,setisowner] = useState("user")
     const [load,setload] = useState(false)
     const [PendingRequests,SetPendingRequests] =   useState([])
     const [currentid,setaccpetload] = useState("")
     const [dataUser,setDataUser] = useState({})
     const [ListOfMembersForOwner,setListOfMembersForOwner] = useState([])
     const [ListOfAdminForOwner,setListOfAdminForOwner] = useState([])
   

     const handleDateChangedebut = (newDate) => {
  
    setdataforConge((prev)=>( {   ...prev,  debut :newDate?.format("YYYY-MM-DD").replaceAll("-","/") }))
  } 


      const handleDateChangefin = (newDate) => {
  
    setdataforConge((prev)=>( {   ...prev,  fin :newDate?.format("YYYY-MM-DD").replaceAll("-","/") }))
  } 

 


    const [dataforConge,setdataforConge] = useState({
      typeCong : '',
      debut:'',
      fin:'',
      motif:''
    })

     const HandelSendConge = async()=>{

    
      if(dataforConge.motif=="" || 
        dataforConge.debut ==""||
        dataforConge.fin ==""||
        dataforConge.typeCong ==""
        
        

      ){
        notify2()
        return 
      }

     setLoaders(true)

     
    
      try{
        const ResData = await axios.post("/holiday/send/v1",
                    {
                  "reason": dataforConge.motif,
                  "nbjr": daysBetween(dataforConge.debut,dataforConge.fin),
                  "roomId":url.roomId,
                  "debut":dataforConge.debut,
                  "fin":dataforConge.fin,
                  "typeConge":dataforConge.typeCong
                } 

              )
       if(ResData.status==200){
        
        notify3()
       }
      }
    
      
  
      catch(err){
      
        if(err?.response?.status==409)
          
        {
         
          notify()
        }
      }
      finally{
        setLoaders(false)
      }
    
     }
     

 
     useEffect(()=>{
      const fetchOrganization = async () =>{
       const response = await axios.post("/ogranization/getSpecOrganization/v1",{
          "roomId":url.roomId
      })
        

      
      if(response.data.res.includes("admin") ||response.data.res=="user"){
        setDataUser(response.data.data)
      
        
      }
     
       if(response.data?.res){
          setisowner(response.data.res)
       }
       if(response.data.res=="owner"){
         setload(true)
        
        const fetchComingrequest = await axios.post("/ogranization/requests/v1/room",{
          "roomId": url.roomId
        })

        const fetchUsersandMembers = await axios.post("/ownerccess/v1",{
             "roomId": url.roomId
        })
     
        setListOfMembersForOwner(fetchUsersandMembers.data.members.members)
        setListOfAdminForOwner(fetchUsersandMembers.data.adminlist)
    
        SetPendingRequests(fetchComingrequest.data.reverse())
     
      
        setload(false)
         
       
       }
        
      }
      fetchOrganization()
     },[])
      

     const  HandelApproveRequest  = async (id,idroom)=>{
      try{

        setaccpetload(id)

       
        const reponse = await axios.post("/ogranization/setmember/v1" ,{
          "repoId":idroom,
          "cinUser":id
      })
 
         
        if(reponse.status ==200)
        {
          SetPendingRequests(reponse.data.requests)
        }

      }catch(err){
        console.log(err.response)
      }
      finally{
        setaccpetload("")
      }
   

     }

     
     const [currentview,setCurerntView] = useState({})
     const HandelShowDetailsRequestConge = (request)=>{
      
      // if(request.reponse==="yes") return;
       
      setCurerntView(request)
      setShowM(true)


     }


     const [showCertifConge,setshowCertifConge] = useState(false)
  
  return (
    <div className="dashboard">
<ToastContainer/>
{
  loaders && <Lodaer/>
}

{/* <div style={{background:"red",width:"100%",height:"400px",position:"absolute",zIndex:9999999,display:"flex",justifyContent:"center",alignItems:"center"}} >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider>
</div> */}


      {/* ================= HEADER ================= */}
      <header className="topbar">

        <div className="brand">
          <div className="brand-logo">
            
              <span className="brand-s" style={{cursor:"pointer"}} onClick={()=>Nav("/organizations")}>STIR</span>
          </div>

          <div className="brand-text">
            <strong>Société Tunisienne des</strong>
            <span>Industries de Raffinage</span>
          </div>
        </div>

        <div className="header-right">

          <div className="notification">
            <Bell size={23} strokeWidth={1.8} />
            <span className="notification-count">{owner? PendingRequests?.length:0}</span>
          </div>

          <div className="user-menu">

            <div className="avatar">
              <div className="avatar-face">👨🏻</div>
            </div>

            <div className="header-user-info">
              <strong>{state?.nom ?state.nom :"user"}</strong>
              <span>{owner.includes("admin")? 
              owner.includes("admin") &&owner.substr(owner.indexOf("-")+1,owner.length)
              : owner}  </span>
         
            </div>

            <ChevronDown size={17} />

          </div>

        </div>

      </header>


      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="organization-card">

          <div className="organization-icon">
            <Building2 size={22} />
          </div>

          <div>
            <strong>Maintenance Industrielle</strong>
            <span>ID: {url.roomId}</span>
          </div>

        </div>


        <nav className="sidebar-navigation">

          <SidebarItem
            active
            icon={owner=="owner"? <CheckLineIcon size={19}/> :<Home size={19} />}
          >
            
            {owner=="owner"?"accpet demandes" : "Tableau de bord "  }
            
          </SidebarItem>

     {
      owner.includes("admin")  && <>

 <div onClick={()=>Nav(`/organizations/admin/${url.roomId}`)} >  
          <SidebarItem 
                  
                    icon={<CalendarDays size={19} />}
                    
                  >  
                  <h3 > Gestion des demandes </h3>
                  </SidebarItem>
        </div>

              
      {/*  onClick={()=>Nav(`/attestation/${url.roomId}`)}  */}
      </>
     }  

     {(owner=="user" || owner.includes("admin"))  && <> <SidebarItem  icon={<Award   size={19} />} > <span  onClick={()=>Nav(`/attestation/${url.roomId}`)} > Obtenir une attestation de présence</span>   </SidebarItem> </>    }
     {owner=="owner"   && <> <SidebarItem  icon={<User size={19} />} >  <h2 onClick={()=>{
      __setDashAdmin((p) => {
        const newValue = !p;
        localStorage.setItem("showDadming", JSON.stringify(newValue));
        return newValue;
      });

      
     }}> set admins</h2> </SidebarItem> </>    }
          
        
 
        
        </nav>


        <div className="sidebar-bottom" onClick={()=>Nav("/login")}>

          <SidebarItem icon={<LogOut size={19} />}>
            Déconnexion
          </SidebarItem>

        </div>

      </aside>


      {/* ================= MAIN ================= */}
      <main className="main-content">

        <div className="city-background" />

   {/* ================= owner code ================= */}
       {
        owner=="owner" ? 
        
     
 
        <div className="requests-page">
    
     

        {/* <div className="__dashboard__follow__set__admins">
         
        </div> */}
        {
         __showDashAdmin &&   <AdminStructure

          listMember={ListOfMembersForOwner}
          listAdmins={ListOfAdminForOwner}
          /> 
        }

        
       <div className="requests-header">
        <div>
          <span className="requests-eyebrow">ACCESS MANAGEMENT</span>
          <h1>Pending requests</h1>
          <p>Examinez les personnes qui attendent de rejoindre votre espace de travail.</p>
        </div>

        <div className="requests-count">
          <span>{PendingRequests?.length || 0}</span>
          <small>pending</small>
        </div>
      </div>

      <div className="requests-list">

       
       

{

   
 
  load ?  <SimpleLoader/>  : 
 
  
  PendingRequests?.map((item)=><div key={item.cin} className="request-card"  >
            
          <div className="person-info">
            <div className="person-avatar">{item.nom.substr(0,1)}</div>
       
            <div>
              <h3>ID : {item.cin}</h3>
              <h3>{item.nom}</h3>
              <p>{item.nom}@email.com</p>
              <span className="request-time" style={{fontWeight:"bold"}}>{item.date.substr(0,item.date.indexOf("T")).replaceAll("-","/")}</span>
            </div>
          </div>

          <div className="request-actions">
            <button className="refuse-btn">
              Refuse
            </button>

            <button className="accept-btn" onClick={()=>HandelApproveRequest(item.cin,url.roomId)}>
              
             
              {
              currentid==item.cin ?  "loading"  : <><span>✓</span>  Accept</>
              }
              
            </button>
          </div>
        </div>

 
  ) 
}
    
      </div>
        </div>
            

            
        
        
        : 
        <>
 {/* ================= user | admin ================= */}
  
    {
       showCertifConge &&   <CertifConge data={currentview} ff2={()=>setshowCertifConge(false)}/>
    }

{
  showM && <RefusedLeaveModal f3help={()=>setshowCertifConge(true)} ffhelp={()=>setShowM(false)} modelData={currentview}/>
}


 <div>

 </div>
 {/* this dashborad amdmin and user  */}
        <section className="welcome">
          

          <h1>
            Bonjour, {state?.nom ?`${state.nom} ${state.prenom}` :"user"}   <span>👋 </span>
            <span >ID:{state.cin}</span>
          </h1>

          <p>
            Voici un aperçu de votre activité et de vos informations.
          </p>

        </section>


        {/* ================= STAT CARDS ================= */}
        <section className="stats-grid">

          <StatCard
            title="Solde congés restants"
            value={dataUser.conge}
            suffix="jours"
            description={`Sur l'année ${new Date().getFullYear()}`}
            icon={<CalendarDays size={26} />}
            type="blue"
          />
            <StatCard
          title="Demande actuellement chez"
          value={dataUser.findMyrequest}
          description="En cours de traitement"
          icon={<UserCheck size={24} />}
          type="blue"
        />
    
          {/* <StatCard
            title="Demandes approuvées"
            value="2"
            suffix="demandes"
            description="Cette année"
            icon={<CircleCheck size={27} />}
            type="green"
          /> */}

          <StatCard
            title="Salaire net mensuel"
            value={dataUser.salaire}
            description="Salaire net"
            icon={<Wallet size={26} />}
            type="blue"
          />

        </section>
 

        {/* ================= LOWER CONTENT ================= */}
        <section className="dashboard-grid">

          {/* LEFT */}
          <div className="left-column">

            {/* Requests */}
            <div className="panel requests-panel">

              <div className="panel-header">

                <h2>Mes demandes de congé</h2>

                <button className="view-all">
                  Voir toutes
                </button>

              </div>

     
              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Date de demande</th>
                      <th>Période</th>
                      <th>Type</th>
                      <th>Statut</th>
                    
                    </tr>
                  </thead>

                  <tbody>

                    {dataUser?.response_conge?.map((request, index) => (

                      <tr key={request.dateResponse_conge} style={{cursor:"pointer"}}>

                        <td style={{fontSize:"10px"}}>{request.dateResponse_conge.substr(0,request.dateResponse_conge.indexOf("T")).replaceAll("-","/")}</td>

                        <td style={{fontSize:"10px"}}>{request.debut} - {request.fin}</td>

                        <td style={{fontSize:"10px"}}>{request.typeConge}</td>

                        <td style={{ display:"flex",alignItems:"center",width:"100%",gap:"10px"}} > 

                          <span
                          
                          style={{cursor:"pointer"}}
                            className={`status ${request.reponse=="yes"?"approved":"refure"}`}
                          >
                            
                            <p onClick={()=>HandelShowDetailsRequestConge(request)}>{request.reponse ? "Approuvé":"Refusé"}</p>
                            {/* {request.reponse=="yes"?<p>Approuvé</p>:<p onPointerEnter={()=>HandelShowDetailsRequestConge(request)}>Refusé</p>} */}
                            
                          </span>
                         
                        </td>
                       
                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              <div className="table-decoration">
                <CalendarDays size={75} />
              </div>

            </div>


            {/* New request */}
            <div className="panel request-form-panel">

              <div className="panel-header">

                <h2>Nouvelle demande de congé</h2>

              </div>


              <form className="leave-form">

                <div className="form-group full">

                  <label style={{fontSize:"15px"}}>Type de congé</label>

                  <div className="select-wrapper">

                    <select style={{fontSize:"15px"}} defaultValue="" onChange={(e)=>setdataforConge((prev)=>(
                      {
                        ...prev,
                        typeCong :e.target.value
                      }
                    ))}>
                      <option value="" disabled>
                        Sélectionner un type
                      </option>

                      <option>Congé annuel</option>
                      <option>Congé exceptionnel</option>
                      <option>Congé maladie</option>
                    </select>

                    <ChevronDown size={17} />

                  </div>

                </div>


                <div className="form-row">

                  <div className="form-group">

                    <label style={{fontSize:"13px"}} >Date de début</label>

                    <div className="input-icon">

                      {/* <input

                      onChange={(e)=>setdataforConge((prev)=>(
                      {
                        ...prev,
                        debut :e.target.value
                      }
                    ))} 



                        type="text"
                        placeholder="jj/mm/aaaa"
                      /> */}

                      
                    <div style={{ width: "100%", maxWidth: "300px" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        
                          onChange={handleDateChangedebut}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>


                    </div>

                  </div>
                 <br/>

                  <div className="form-group">

                    <label style={{fontSize:"13px"}}>Date de fin</label>

                    <div className="input-icon">

                      {/* <input

                       onChange={(e)=>setdataforConge((prev)=>(
                      {
                        ...prev,
                        fin :e.target.value
                      }
                    ))} 



                        type="text"
                        placeholder="jj/mm/aaaa"
                      /> */}

                         <div style={{ width: "100%", maxWidth: "300px" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          
                          onChange={handleDateChangefin}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>

                    </div>

                  </div>

                </div>


                <div className="form-group full">

                  <label style={{fontSize:"13px"}}>Motif</label>

                  <textarea

                      style={{fontSize:"14px"}}
                   onChange={(e)=>setdataforConge((prev)=>(
                      {
                        ...prev,
                        motif :e.target.value
                      }
                    ))} 



                    placeholder="Décrivez votre motif..."
                  />

                </div>


                <button
                  type="button"
                  className="submit-button"
                  onMouseUp={()=>HandelSendConge()}
                >
                  Envoyer la demande
                  <Send size={15} />
                </button>
              

              </form>

            </div>

          </div>


          {/* RIGHT */}
          <div className="right-column">

            <div className="panel profile-panel">

              <div className="panel-header">

                <h2>Mon profil</h2>

              </div>


              <div className="profile-main">

                <div className="large-avatar">
                  <div className="avatar-face">👩🏻</div>
                </div>

                <div className="profile-name">

                  <h3 style={{fontSize:"15px"}}>{state.nom} </h3>

                    <span style={{fontSize:"15px"}}>{owner.includes("admin")? 
              owner.includes("admin") &&owner.substr(owner.indexOf("-")+1,owner.length)
              : owner}  </span>

                  <span>Maintenance industrielle</span>

                </div>

              </div>


              <div className="profile-details">

                <div className="profile-detail">

                  <Mail size={15} />

                  <div >
                    <span  style={{fontSize:"14px"}} >Email</span>
                    <strong  style={{fontSize:"14px"}}>{state.nom}.{state.prenom}@stir.com.tn</strong>
                  </div>

                </div>


                <div className="profile-detail">

                  <Phone size={15} />

                  <div>
                    <span  style={{fontSize:"15px"}} >Téléphone</span>
                    <strong  style={{fontSize:"15px"}}>22 123 456</strong>
                  </div>

                </div>


                <div className="profile-detail">

                  <CalendarDays size={15} />
                  

                  <div>
                    <span  style={{fontSize:"15px"}}>Date d'embauche</span>
                    <strong  style={{fontSize:"15px"}}>18/04/2023</strong>
                  </div>

                </div>

              </div>


              <button className="profile-button">

                Voir mon profil complet

                <ArrowRight size={17} />

              </button>

            </div>

          </div>

        </section>        
        </>
       }

      </main>


  
    </div>
  );
}

export default Dashboard;