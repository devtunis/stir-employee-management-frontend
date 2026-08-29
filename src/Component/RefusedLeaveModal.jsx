 
 
 
import { Award } from "lucide-react";
import { daysBetween } from "../util/day";
import "./RefusedLeaveModal.css";
 
import { useState } from "react";
const RefusedLeaveModal = ({modelData ,ffhelp ,f3help}) => {

  const [showCertif,setShowCertif] = useState(false)
 

  return (
    <>
 
       
  
    
   
    <div className="refusedLeaveModel"  onMouseLeave={()=>ffhelp()}>

      <div className="refusedLeaveHeader">
   
         
         {
          modelData.reponse=="yes"?  <p>Votre demande de congé a été accepté</p>: <p>Votre demande de congé a été refusée</p>
         }
     
       {
       modelData.reponse=="yes" ?   <span className="approuve">Approuvé</span>  :  <span className="refusedBadge">Refusé</span>
       }
      
        
      </div>

      <div className="refusedLeaveDetails">

        <div className="detailBox">
          <span>Type de congé</span>
          <strong>{modelData.typeConge}</strong>
        </div>

        <div className="detailBox">
          <span>Période</span>
          <strong>{modelData.debut} → {modelData.fin}</strong>
        </div>

        <div className="detailBox">
          <span>Durée</span>
          <strong>{daysBetween(modelData.debut,modelData.fin)} jours</strong>
        </div>

      </div>

      {
        modelData.reponse=="no"  ? 
        <>   
        <div className="refusedReason">
        <span>Motif du refus</span>
        <p>
         {modelData.reason}
        </p>

      </div>

      </>
      :
<>  
         <div className="__approve">
        <span>Motif </span>
           <p>accepté par {modelData.reason.includes("admin")?modelData.reason.substr(modelData.reason.indexOf("-")+1) : modelData.reason }</p>

      </div> 
       <br/>
          <h3
          onClick={()=>f3help()}
            style={{
              cursor:"pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: 0,
              padding: "14px 18px",

              color: "#1e293b",
              backgroundColor: "#ffffff",

              border: "1px solid #e2e8f0",
              borderLeft: "4px solid #2563eb",
              borderRadius: "8px",

              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.2px",

              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
            }}
          >
            <span
          
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "7px",
                backgroundColor: "#eff6ff",
                color: "#2563eb",
              }}
            >
              <Award size={19} strokeWidth={2} />
            </span>

            afficher l’attestation de congé
          </h3>


          
    </>
      }

      <div className="refusedLeaveFooter">
        {/* <small>Répondu par {modelData.cin_reponse}</small> */}

        {/* <button>Fermer</button> */}
      </div>

    </div>
     </>
  );
};

export default RefusedLeaveModal;
 
