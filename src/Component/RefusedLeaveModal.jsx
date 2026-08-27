 
 
 
import { daysBetween } from "../util/day";
import "./RefusedLeaveModal.css";

const RefusedLeaveModal = ({modelData ,ffhelp}) => {

 

  return (
    <div className="refusedLeaveModel"  onMouseLeave={()=>ffhelp()}>

      <div className="refusedLeaveHeader">
   
         
          <p>Votre demande de congé a été refusée</p>
     

        <span className="refusedBadge">Refusé</span>
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

      <div className="refusedReason">
        <span>Motif du refus</span>
        <p>
         {modelData.reason}
        </p>
      </div>

      <div className="refusedLeaveFooter">
        {/* <small>Répondu par {modelData.cin_reponse}</small> */}

        {/* <button>Fermer</button> */}
      </div>

    </div>
  );
};

export default RefusedLeaveModal;
 
