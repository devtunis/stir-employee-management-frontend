import React, { useEffect, useState } from "react";
import {
  Crown,
  Search,
  SlidersHorizontal,
  UserRoundPlus,
  Info,
  UserRoundCheck,
  Delete,
 
} from "lucide-react";

import "./AdminStructure.css";
 
import { use } from "../../axiosClient/usehook.js";
import { useParams } from "react-router-dom";
  
const AdminManagement = ({listMember,listAdmins}) => {
  const [activeTab, setActiveTab] = useState("assign");
  const {roomId} = useParams()
  const [lm,setlmb] = useState([])
  const [sm,setad] = useState([])
                        
  const [availableChoise,SetavailableChoise] = useState(['admin-Directeur', 'admin-Chef de Service', 'admin-RH'])
  useEffect(()=>{ setlmb(listMember) },[listMember])
  useEffect(()=>{ setad(listAdmins) },[listAdmins])

 
  
 


  useEffect(()=>{
     if(listAdmins.length>0){
     

         
      const currentAdmins  = listAdmins.map(item=>item.role)
      const reulst  = availableChoise.filter(item =>!(currentAdmins.find(v=>v==item)))
      SetavailableChoise(reulst)

    }
  
  },[listAdmins])

  function filterchoises(data){

     
      const currentAdmins  = data.map((item)=>item.role)  
      const reulst  = availableChoise.filter(item =>!(currentAdmins.find(v=>v==item)))
      SetavailableChoise(reulst)
 
 
  
  }
 






  const [state,SetState] = useState({
    usercin:'',
    next:'end',
    role:'',
    isHead:false
  })
  const HandelAssigne  = async ()=>{
      

       let body = {
          "repoId":roomId ,
          "cinUser":state.usercin,
          "roleTitle":state.role ,
          "head":state.isHead,
          "next":state.next
  
    }
 
    
    if(state.usercin.length==0 || state.next.length==0   || state.role.length==0 )
    {
       alert("missing fields")
      return
    }


    
 
    const {err,data} = await use("/ogranization/setadmin_next/v1","post",body)
    if(err!=null) return


      setad(data.data.LeaksMembers)
      setlmb(data.data.res.members)
      filterchoises(data.data.filteradmin)
 
      
      SetState(prev => ({
        ...prev,
        role: "",
        usercin: "",
        next: "end",
        isHead: false
      }));
      
  }
   
 
 const SetAdminToUser  = async  (user)=>{

    let body = {
          "repoId":roomId ,
          "cinUser":user.cin,
          "roleTitle":"user" ,
          "head":false,
          "next":"nil"
  
    }
 
   
    const {err,data} = await use("/ogranization/setadmin_next/v1","post",body)
    if(err!=null) return

     setad(data.data.filteradmin)
     setlmb(data.data.res.members)
     SetavailableChoise((prev)=>[...prev,user.role])
 
    
   
        SetState(prev => ({
          ...prev,
          role: "",
          usercin: "",
          next: "end",
          isHead: false
        }));
      
 }
  return (
    <div className="adminManagementPage">

    

      <section className="adminStructureCard">

        <div className="structureHeader">

          <div className="structureTitle">

            <h2>Structure administrative</h2>

            <p>
              Visualisez la chaîne hiérarchique et gérez vos administrateurs
            </p>

          </div>

        

        </div>


      

        <div className="adminChain">

          {sm.map((admin, index) => (

            <React.Fragment key={admin.cin}>

              <div   className={`adminNode ${"blue"}`}>

              

                <div className={`adminAvatar ${"blue"}`}>
                  {admin.cin}
                </div>


             

                <div className="adminNodeContent">

                  <span className={`levelBadge ${"blue"}`} style={{fontSize:"15px"}} >

                    
                     {admin.role.includes("admin")? admin.role.substr(admin.role.indexOf("-")+1,admin.role.length) : admin.role}
                     
                  </span>

                 

                  <div className="adminRole">
                 

                    { admin.next=="end"    && (
                      <span className="headBadge">
                        <Crown size={15} />
                        End
                      </span>
                    )}

                      { admin.isHead     && (
                      <span className="headBadge">
                        <UserRoundCheck  size={14} />
                        Head
                      </span>
                    )}

                  </div>
              
                  

                </div>


                {/* More */}
                <div className={`adminAvatar ${"green"}`}>
                  {admin.next}
                </div>
              </div>


            

            </React.Fragment>

          ))}

        </div>


  

        <div className="ownerInformation">

          <div className="ownerInfoIcon">
            <Info size={15} />
          </div>

          <span>
            Vous êtes le propriétaire (Head) de cette structure.
            Vous pouvez gérer les administrateurs et les utilisateurs.
          </span>

        </div>

      </section>


     

      <div className="managementGrid">

 

        <section className="usersCard">

          <div className="usersHeader">

            <div>
              <h2>Utilisateurs de votre organisation</h2>
            </div>

          </div>


       

          <div className="usersTools">

            <div className="searchBox">

              <Search size={15} />

              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
              />

            </div>


            <select className="roleFilter">
              <option>Tous les rôles</option>
              <option>Utilisateur</option>
              <option>Administrateur</option>
            </select>


            <button className="filterButton">
              <SlidersHorizontal size={15} />
            </button>

          </div>


         

          <div className="usersTable">

          

            <div className="tableHeader">

              <span  style={{textAlign:"center",fontSize:"10px"}} >Utilisateur</span>
          
              <span style={{fontSize:"10px"}}>Rôle actuel</span>
              <span style={{fontSize:"10px"}}>next</span>
              <span style={{fontSize:"10px"}}>Actions</span>

            </div>

 

            {lm.map((user) => (

              <div className="userTableRow" key={user.cin}>

        

                <div className="tableUser" style={{display:"flex",justifyContent:"center"}}>

                  <div className="smallAvatar">
                    {user.cin}
                  </div>

            


                </div>


           

                <div>

                  <span className="userRoleBadge" style={{fontSize:"10px"}}>
                    {user.role.includes("admin")? user.role.substr(user.role.indexOf("-")+1,user.role.length) : user.role}
                  </span>

                </div>


 

                <div className="assignedAdmin">

                  <i className={user.next!="nil"  ?"green":"blue"}></i>

                  <span style={{fontSize:"13px"}}>{user.next}</span>

                </div>


              
                {
                  user.role.includes("admin") &&  <button className="rowAction">
                  <Delete size={16} onClick={()=>SetAdminToUser(user)} />
                </button>

                }
                
              </div>

            ))}

          </div>


       

        </section>


  

        <section className="manageCard">

          <div className="manageHeader">

            <div>

              <h2>Gérer les utilisateurs</h2>

            </div>

          </div>


    
 
          <div className="manageTabs">

            <button
              className={activeTab === "details" ? "active" : ""}
              onClick={() => setActiveTab("details")}
            >
              Détails
            </button>

            <button
              className={activeTab === "assign" ? "active" : ""}
              onClick={() => setActiveTab("assign")}
              style={{fontSize:"13px"}}
            >
              Assigner un rôle
            </button>

          </div>


          {activeTab === "assign" && (

           <div className="assignContent">

  <h3 style={{ fontSize: "13px" }}>
    Assigner un utilisateur à un administrateur
  </h3>

 

  <label style={{ fontSize: "13px" }}>Utilisateur</label>

  <select  onChange={(e) => {
    SetState((prev)=>({
      ...prev,
      usercin:e.target.value
    }));
  }}  >
    <option style={{ fontSize: "13px" }}>
      Sélectionner un utilisateur
    </option>

    {listMember.map((user) => (
      <option  key={user.cin} style={{ fontSize: "13px" }}>
        {user.cin}
      </option>
    ))}
  </select>

 

  <label style={{ fontSize: "16px" }}>
    next
  </label>

  <select
   onChange={(e) => {
    SetState((prev)=>({
      ...prev,
      next:e.target.value
    }))}}
  
  >
    <option   style={{ fontSize: "20px" }}>
      end
    </option>

    {listMember.map((admin) => (
      <option key={admin.cin} style={{ fontSize: "13px" }}>
        {admin.cin}
      </option>
    ))}
  </select>

 

  <label style={{ fontSize: "13px" }}>Rôle</label>

<select
  value={state.role}  
  onChange={(e) =>
    SetState((prev) => ({
      ...prev,
      role: e.target.value
    }))
  }
  style={{ fontSize: "13px" }}
>
  <option   value="">
    choisir role
  </option>

  {availableChoise.map((item) => (
    <option
      key={item}
      value={item}
      style={{
        fontWeight: "bold",
        color: "black",
        fontFamily: "cursive"
      }}
    >
      {item.substring(item.indexOf("-") + 1)}
    </option>
  ))}
</select>



 

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "10px",
      marginBottom: "12px",
      fontSize: "13px",
    }}
  >
    <input
      type="checkbox"
      id="Head"
      style={{ width: "15px", height: "15px" }}
      onChange={(e)=>
        SetState((prev)=>({
          ...prev,
          isHead:!state.isHead
        }))
      }
    />

    <label htmlFor="Head" style={{ fontSize: "13px", margin: 0 }}>
      Head
    </label>
  </div>

  {/* BUTTON */}

  <button className="assignButton" onClick={()=>HandelAssigne()}>
    <UserRoundPlus size={15} />
    Assigner
  </button>

  {/* INFO */}

  <div className="assignInformation">
    <Info size={15} />

    <span>
      L'Utilisateur sera rattaché à l'administrateur sélectionné et pourra être
      géré par celui-ci.
    </span>
  </div>

</div>

          )}

        </section>

      </div>

    </div>
  );
};

export default AdminManagement;