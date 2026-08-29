 
import { useEffect, useRef, useState } from "react";
import "./Certificate.css";
import { use } from "../axiosClient/usehook";
import { useParams } from "react-router-dom";
 

export default function Certificate() {


 const [showAttesation,SetAttesation] = useState(false)
 const [data,setdata] = useState({})
const url = useParams()
 
 const PreparePayloadForAttesation = async()=>{
  const {err,data} = await use("/ogranization/attesationDePresence/v1","post",{
  "roomId":url.roomid
})
if(err!=null){
  console.log(err)
  return
}
 setdata(data.data)
 SetAttesation(true)
 }


  const downloadCertificate = () => {
    window.print();
  };

 const time =  new Date()
 const customTime =`${ time.getFullYear() }/${ time.getMonth()}/${time.getDay()}`
  return (

    <> 
    {
      showAttesation ?
     
      
       <div className="certificate-page">

   
     
<div className="certificate-actions">

  <button
    className="download-button"
    onClick={()=>downloadCertificate()}
  >

    <span className="button-decoration left"></span>

    <span className="download-icon">
      ↓
    </span>

    <span className="download-button-text">
      Télécharger l'attestation
    </span>

    <span className="button-decoration right"></span>

  </button>

</div>
 


      {/* CERTIFICATE */}
      <div className="certificate">

        <div className="certificate-inner">

          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>


          {/* HEADER */}
          <section
            className="certificate-hero"
            style={{
              backgroundImage:
                "url('/homePictuer/refinery.jpg')",
            }}
          >

            <div className="hero-overlay"></div>

            <div className="hero-content">

              <div>

                <div className="hero-label">
                  INDUSTRIAL EXCELLENCE • PRESENCE RECORD
                </div>

                <div className="hero-title">
                  OFFICIAL ATTENDANCE
                </div>

              </div>

            </div>

          </section>


          {/* CONTENT */}
          <main className="certificate-content">

            <div className="ornament">
              ✦ <span>✧</span> ✦
            </div>

            <div className="subtitle">
              DOCUMENT OFFICIEL
            </div>

            <h1>
              Attestation de Présence
            </h1>

            <div className="gold-line"></div>

            <p className="intro">
              Nous avons l’honneur de certifier que
            </p>

            <div className="participant-name">
              Mme/M. {` [${data.nom} ${data.prenom}]`}
            </div>

            <p className="body-text">

              a été régulièrement présent(e) au sein de{" "}

              <strong>
                [{data.nameOrg}]
              </strong>

             

            </p>

            <p className="body-text">

              La présente attestation est délivrée à l'intéressé(e)
              pour servir et valoir ce que de droit.

            </p>


            {/* INFORMATION */}
            <div className="certificate-meta">

              <div className="meta-item">

                <span className="meta-label">
                  RÉFÉRENCE
                </span>

                <span className="meta-value">
                  CERT-2026-{url.roomid}
                </span>

              </div>


              <div className="meta-divider"></div>


              <div className="meta-item">

                <span className="meta-label">
                  LIEU
                </span>

                <span className="meta-value">
                   tunis / bizerte 
                </span>

              </div>


              <div className="meta-divider"></div>


              <div className="meta-item">

                <span className="meta-label">
                  ÉMIS LE
                </span>

                <span className="meta-value">
                 {customTime}
                  
                </span>

              </div>

            </div>


            {/* FOOTER */}
            <div className="certificate-footer">

              <div className="date-block">

                <span>
                  <strong>Fait à</strong>  Bizerte
                </span>

                <span>
                  <strong>Le</strong>  {customTime}
                </span>

              </div>


              {/* SIGNATURE */}
              <div className="signature-block">

                <div className="signature-placeholder">
                  Signature autorisée
                </div>

                <div className="signature-line">
                  <img src="/sig/sig.png"/>
                </div>
 

              </div>

            </div>

          </main>


          {/* SEAL */}
          <div className="certificate-seal">

            <div className="seal-inner">

              <div className="seal-star">
                ★
              </div>

              <div className="seal-title">
                PRESENCE
              </div>

              <div className="seal-title">
                OFFICIEL
              </div>

              <div className="seal-small">
                ✦ VALIDATION ✦
              </div>

            </div>

          </div>


          {/* WATERMARK */}
          <div className="certificate-watermark">
            SPECIMEN
          </div>


          <div className="certificate-notice">
            DOCUMENT OFFICIEL • À COMPLÉTER ET VALIDER PAR L’ORGANISME ÉMETTEUR
          </div>

        </div>

      </div>

    </div>


      :  
      <div className="showAttesation"  >
        <button onClick={()=>PreparePayloadForAttesation()}>show Attesation</button>
      </div>
    }

   
     </>

  );
}
 
