import "./Certificate.css";
// import refineryImage from "./assets/refinery.png";

export default function Certificate() {
  return (
    <div className="certificate-page">
      <div className="certificate">

        <div className="certificate-inner">

          {/* Decorative corners */}
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          {/* HEADER IMAGE */}
          <section
            className="certificate-hero"
            style={{ backgroundImage: `url(/homePictuer/refinery.jpg)` }}
          >
            <div className="hero-overlay" />

            <div className="hero-content">
              <div>
                <div className="hero-label">
                  INDUSTRIAL EXCELLENCE • PRESENCE RECORD
                </div>

                <div className="hero-title">
                  OFFICIAL ATTENDANCE TEMPLATE
                </div>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <main className="certificate-content">

            <div className="ornament">
              ✦ <span>✧</span> ✦
            </div>

            <div className="subtitle">
              DOCUMENT DE PRÉSENTATION • MODÈLE DE CERTIFICAT
            </div>

            <h1>
              Certificat de Présence
            </h1>

            <div className="gold-line" />

            <p className="intro">
              Nous avons l’honneur de certifier que
            </p>

            <div className="participant-name">
              [Nom et Prénom du Participant]
            </div>

            <p className="body-text">
              a participé à{" "}
              <span className="event-name">
                [Nom de l’Événement / Formation]
              </span>
              , organisé du{" "}
              <strong>[Date début]</strong>{" "}
              au{" "}
              <strong>[Date fin]</strong>
              , à{" "}
              <strong>[Lieu]</strong>.
            </p>

            <p className="body-text">
              Le présent document atteste de la participation du titulaire
              à titre de modèle administratif et peut être complété par
              l’organisme responsable avec ses informations vérifiables.
            </p>

            {/* INFORMATION ROW */}
            <div className="certificate-meta">

              <div className="meta-item">
                <span className="meta-label">
                  RÉFÉRENCE
                </span>

                <span className="meta-value">
                  [CERT-2026-XXXX]
                </span>
              </div>

              <div className="meta-divider" />

              <div className="meta-item">
                <span className="meta-label">
                  LIEU
                </span>

                <span className="meta-value">
                  [Ville / Site]
                </span>
              </div>

              <div className="meta-divider" />

              <div className="meta-item">
                <span className="meta-label">
                  ÉMIS LE
                </span>

                <span className="meta-value">
                  [JJ / MM / AAAA]
                </span>
              </div>

            </div>

            {/* FOOTER */}
            <div className="certificate-footer">

              <div className="date-block">
                <span>
                  <strong>Fait à</strong> [Ville]
                </span>

                <span>
                  <strong>Le</strong> [Date]
                </span>
              </div>

              {/* SIGNATURE */}
              <div className="signature-block">

                <div className="signature-placeholder">
                  Signature autorisée
                </div>

                <div className="signature-line" />

                <strong>
                  [Nom du Signataire]
                </strong>

                <small>
                  [Fonction / Qualité]
                </small>

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
                TEMPLATE
              </div>

              <div className="seal-small">
                ✦ SPECIMEN ✦
              </div>

            </div>

          </div>

          {/* WATERMARK */}
          <div className="certificate-watermark">
            SPECIMEN
          </div>

          <div className="certificate-notice">
            MODÈLE DE PRÉSENTATION • À COMPLÉTER ET VALIDER PAR L’ORGANISME ÉMETTEUR
          </div>

        </div>
      </div>
    </div>
  );
}