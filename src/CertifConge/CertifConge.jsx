import { useParams } from "react-router-dom";
import { useStoreauth } from "../useStore/UseStoreContext";
import { daysBetween } from "../util/day";
import "./CertifConge.css";
import { useEffect, useRef, useState } from "react";
import { use } from "../axiosClient/usehook";

export default function CertifConge({ data, ff2 }) {
  const { state } = useStoreauth();
  const url = useParams();

  const certificateRef = useRef(null);

  const [nomOrg, setNomOrg] = useState("");

  useEffect(() => {
    const PreparePayloadForAttesation = async () => {
      const { err, data } = await use(
        "/ogranization/attesationDePresence/v1",
        "post",
        {
          roomId: url.roomId,
        }
      );

      if (err != null) {
        console.log(err);
        return;
      }

      setNomOrg(data.data.nameOrg);
    };

    PreparePayloadForAttesation();
  }, [url.roomId]);

  // =========================================================
  // HTML -> SVG -> CANVAS -> PNG
  // =========================================================

 const downloadCertificate = async () => {
  try {
    const canvas = document.createElement("canvas");

    const width = 1600;
    const height = 2200;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Canvas non supporté");
      return;
    }

    // =====================================================
    // FOND
    // =====================================================

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // =====================================================
    // BORDURE
    // =====================================================

    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 8;

    ctx.strokeRect(
      40,
      40,
      width - 80,
      height - 80
    );

    // =====================================================
    // IMAGE HEADER
    // =====================================================

    const headerImage = new Image();

    headerImage.src = "/homePictuer/refinery.jpg";

    await new Promise((resolve, reject) => {
      headerImage.onload = resolve;
      headerImage.onerror = reject;
    });

    ctx.drawImage(
      headerImage,
      40,
      40,
      width - 80,
      300
    );

    // Overlay sombre
    ctx.fillStyle = "rgba(0,0,0,0.55)";

    ctx.fillRect(
      40,
      40,
      width - 80,
      300
    );

    // =====================================================
    // HEADER TEXT
    // =====================================================

    ctx.textAlign = "center";

    ctx.fillStyle = "#d4af37";

    ctx.font = "bold 28px Arial";

    ctx.fillText(
      "INDUSTRIAL EXCELLENCE • HUMAN RESOURCES",
      width / 2,
      140
    );

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 58px Arial";

    ctx.fillText(
      "OFFICIAL LEAVE CERTIFICATE",
      width / 2,
      230
    );

    // =====================================================
    // ORNEMENT
    // =====================================================

    ctx.fillStyle = "#c9a227";

    ctx.font = "32px serif";

    ctx.fillText(
      "✦  ✧  ✦",
      width / 2,
      410
    );

    // =====================================================
    // SOUS TITRE
    // =====================================================

    ctx.fillStyle = "#777";

    ctx.font = "26px Arial";

    ctx.fillText(
      "DOCUMENT OFFICIEL",
      width / 2,
      470
    );

    // =====================================================
    // TITRE
    // =====================================================

    ctx.fillStyle = "#111";

    ctx.font = "bold 64px Georgia";

    ctx.fillText(
      "Certificat de Congé",
      width / 2,
      560
    );

    // Ligne dorée

    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(450, 600);
    ctx.lineTo(1150, 600);

    ctx.stroke();

    // =====================================================
    // INTRO
    // =====================================================

    ctx.fillStyle = "#555";

    ctx.font = "30px Arial";

    ctx.fillText(
      "Nous avons l’honneur de certifier que",
      width / 2,
      680
    );

    // =====================================================
    // NOM
    // =====================================================

    ctx.fillStyle = "#111";

    ctx.font = "bold 48px Georgia";

    ctx.fillText(
      `Mme / M. ${state.prenom} ${state.nom || ""}`,
      width / 2,
      770
    );

    // =====================================================
    // ORGANISATION
    // =====================================================

    ctx.fillStyle = "#555";

    ctx.font = "30px Arial";

    ctx.fillText(
      `employé(e) au sein de ${nomOrg}`,
      width / 2,
      850
    );

    ctx.fillText(
      "est autorisé(e) à bénéficier d’un congé",
      width / 2,
      910
    );

    ctx.fillText(
      "conformément aux dispositions applicables",
      width / 2,
      960
    );

    ctx.fillText(
      "au sein de l’organisme.",
      width / 2,
      1010
    );

    // =====================================================
    // CARTES
    // =====================================================

    const cards = [
      ["TYPE DE CONGÉ", data.typeConge],
      ["DATE DE DÉBUT", data.debut],
      ["DATE DE FIN", data.fin],
      [
        "DURÉE",
        `${daysBetween(data.debut, data.fin)} jours`,
      ],
    ];

    const cardWidth = 320;
    const cardHeight = 180;
    const gap = 30;

    const totalWidth =
      cardWidth * 4 + gap * 3;

    const startX =
      (width - totalWidth) / 2;

    const cardY = 1080;

    cards.forEach((card, index) => {
      const x =
        startX +
        index * (cardWidth + gap);

      // fond
      ctx.fillStyle = "#f7f3e8";

      ctx.fillRect(
        x,
        cardY,
        cardWidth,
        cardHeight
      );

      // bordure
      ctx.strokeStyle = "#c9a227";

      ctx.lineWidth = 2;

      ctx.strokeRect(
        x,
        cardY,
        cardWidth,
        cardHeight
      );

      // label
      ctx.fillStyle = "#777";

      ctx.font = "bold 18px Arial";

      ctx.fillText(
        card[0],
        x + cardWidth / 2,
        cardY + 55
      );

      // valeur
      ctx.fillStyle = "#111";

      ctx.font = "bold 25px Arial";

      ctx.fillText(
        String(card[1]),
        x + cardWidth / 2,
        cardY + 115
      );
    });

    // =====================================================
    // DESCRIPTION
    // =====================================================

    ctx.fillStyle = "#555";

    ctx.font = "28px Arial";

    ctx.fillText(
      "Le présent certificat est délivré à l’intéressé(e)",
      width / 2,
      1370
    );

    ctx.fillText(
      "afin de justifier sa période de congé et pour",
      width / 2,
      1420
    );

    ctx.fillText(
      "servir et valoir ce que de droit.",
      width / 2,
      1470
    );

    // =====================================================
    // META
    // =====================================================

    ctx.fillStyle = "#222";

    ctx.font = "bold 22px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
      `RÉFÉRENCE : CONGE-${url.roomId}`,
      150,
      1600
    );

    ctx.textAlign = "center";

    ctx.fillText(
      "LIEU : Bizerte, Tunisie",
      width / 2,
      1600
    );

    const dateEmission =
      data.dateResponse_conge
        ? data.dateResponse_conge.substring(
            0,
            data.dateResponse_conge.indexOf("T")
          )
        : "";

    ctx.textAlign = "right";

    ctx.fillText(
      `ÉMIS LE : ${dateEmission}`,
      width - 150,
      1600
    );

    // =====================================================
    // FOOTER
    // =====================================================

    ctx.textAlign = "left";

    ctx.fillStyle = "#444";

    ctx.font = "26px Arial";

    ctx.fillText(
      "Fait à Bizerte",
      180,
      1780
    );

    ctx.fillText(
      "Le 29/08/2026",
      180,
      1830
    );

    // =====================================================
    // SIGNATURE
    // =====================================================

    ctx.textAlign = "center";

    ctx.fillText(
      "Signature autorisée",
      1150,
      1780
    );

    // Charger signature

    const signature = new Image();

    signature.src = "/sig/sig.png";

    await new Promise((resolve) => {
      signature.onload = resolve;
      signature.onerror = resolve;
    });

    if (signature.complete && signature.naturalWidth > 0) {
      ctx.drawImage(
        signature,
        1000,
        1800,
        300,
        100
      );
    }

    ctx.strokeStyle = "#333";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(950, 1910);
    ctx.lineTo(1350, 1910);

    ctx.stroke();

    ctx.fillStyle = "#111";

    ctx.font = "bold 25px Arial";

    ctx.fillText(
      data.reason || "",
      1150,
      1960
    );

    // =====================================================
    // SEAL
    // =====================================================

    ctx.beginPath();

    ctx.arc(
      1400,
      210,
      80,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(201,162,39,0.12)";

    ctx.fill();

    ctx.strokeStyle = "#c9a227";

    ctx.lineWidth = 4;

    ctx.stroke();

    ctx.fillStyle = "#c9a227";

    ctx.font = "bold 22px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
      "CONGÉ",
      1400,
      205
    );

    ctx.fillText(
      "OFFICIEL",
      1400,
      235
    );

    // =====================================================
    // WATERMARK
    // =====================================================

    ctx.save();

    ctx.globalAlpha = 0.04;

    ctx.fillStyle = "#000";

    ctx.font = "bold 180px Arial";

    ctx.translate(
      width / 2,
      height / 2
    );

    ctx.rotate(-Math.PI / 6);

    ctx.fillText(
      "OFFICIAL",
      0,
      0
    );

    ctx.restore();

    // =====================================================
    // TÉLÉCHARGEMENT
    // =====================================================

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error(
          "Impossible de générer l'image"
        );

        return;
      }

      const link =
        document.createElement("a");

      const downloadUrl =
        URL.createObjectURL(blob);

      link.href = downloadUrl;

      link.download =
        `certificat-conge-${url.roomId || "document"}.png`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(downloadUrl);
    }, "image/png");

  } catch (error) {
    console.error(
      "Erreur génération certificat :",
      error
    );
  }
};


  return (
    <>
      <div
        className="certificate-page"
        onMouseLeave={() => ff2()}
      >

        <div className="certificate">

          {/* =====================================================
              CERTIFICATE
          ===================================================== */}

          <div
            className="certificate-inner"
            ref={certificateRef}
          >

            {/* CORNERS */}

            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>


            {/* =================================================
                HEADER
            ================================================= */}

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
                    INDUSTRIAL EXCELLENCE • HUMAN RESOURCES
                  </div>

                  <div className="hero-title">
                    OFFICIAL LEAVE CERTIFICATE
                  </div>

                </div>

              </div>

            </section>


            {/* =================================================
                CONTENT
            ================================================= */}

            <main className="certificate-content">

              <div className="ornament">
                ✦ <span>✧</span> ✦
              </div>


              <div className="subtitle">
                DOCUMENT OFFICIEL
              </div>


              <h1>
                Certificat de Congé
              </h1>


              <div className="gold-line"></div>


              <p className="intro">
                Nous avons l’honneur de certifier que
              </p>


              {/* EMPLOYEE NAME */}

              <div className="participant-name">
                Mme / M. {state.prenom} {state.nom || ""}
              </div>


              {/* ORGANIZATION */}

              <p className="body-text">
                employé(e) au sein de{" "}
                <strong className="event-name">
                  {nomOrg}
                </strong>
              </p>


              <p className="body-text">
                est autorisé(e) à bénéficier d’un congé
                conformément aux dispositions applicables
                au sein de l’organisme.
              </p>


              {/* =================================================
                  LEAVE INFORMATION
              ================================================= */}

              <div className="leave-information">

                <div className="leave-card">

                  <span className="leave-label">
                    TYPE DE CONGÉ
                  </span>

                  <span className="leave-value">
                    {data.typeConge}
                  </span>

                </div>


                <div className="leave-card">

                  <span className="leave-label">
                    DATE DE DÉBUT
                  </span>

                  <span className="leave-value">
                    {data.debut}
                  </span>

                </div>


                <div className="leave-card">

                  <span className="leave-label">
                    DATE DE FIN
                  </span>

                  <span className="leave-value">
                    {data.fin}
                  </span>

                </div>


                <div className="leave-card">

                  <span className="leave-label">
                    DURÉE
                  </span>

                  <span className="leave-value">
                    {daysBetween(data.debut, data.fin)} jours
                  </span>

                </div>

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="body-text leave-description">
                Le présent certificat est délivré à l’intéressé(e)
                afin de justifier sa période de congé et pour
                servir et valoir ce que de droit.
              </p>


              {/* =================================================
                  META INFORMATION
              ================================================= */}

              <div className="certificate-meta">

                <div className="meta-item">

                  <span className="meta-label">
                    RÉFÉRENCE
                  </span>

                  <span className="meta-value">
                    CONGE-{url.roomId}
                  </span>

                </div>


                <div className="meta-divider"></div>


                <div className="meta-item">

                  <span className="meta-label">
                    LIEU
                  </span>

                  <span className="meta-value">
                    Bizerte, Tunisie
                  </span>

                </div>


                <div className="meta-divider"></div>


                <div className="meta-item">

                  <span className="meta-label">
                    ÉMIS LE
                  </span>

                  <span className="meta-value">
                    {data.dateResponse_conge
                      ? data.dateResponse_conge.substring(
                          0,
                          data.dateResponse_conge.indexOf("T")
                        )
                      : ""}
                  </span>

                </div>

              </div>


              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="certificate-footer">

                <div className="date-block">

                  <span>
                    <strong>Fait à</strong>
                    {" Bizerte"}
                  </span>

                  <span>
                    <strong>Le</strong>
                    {" 29/08/2026"}
                  </span>

                </div>


                {/* SIGNATURE */}

                <div className="signature-block">

                  <div className="signature-placeholder">
                    Signature autorisée
                  </div>

                  <div className="signature-line">

                    <img
                      src="/sig/sig.png"
                      alt="Signature"
                    />

                  </div>

                  <strong>
                    {data.reason}
                  </strong>

                </div>

              </div>

            </main>


            {/* =================================================
                SEAL
            ================================================= */}

            <div className="certificate-seal">

              <div className="seal-inner">

                <div className="seal-star">
                  ★
                </div>

                <div className="seal-title">
                  CONGÉ
                </div>

                <div className="seal-title">
                  OFFICIEL
                </div>

                <div className="seal-small">
                  ✦ VALIDATION ✦
                </div>

              </div>

            </div>


            {/* =================================================
                WATERMARK
            ================================================= */}

            <div className="certificate-watermark">
              OFFICIAL
            </div>


            {/* =================================================
                NOTICE
            ================================================= */}

            <div className="certificate-notice">
              DOCUMENT OFFICIEL • CERTIFICAT DE CONGÉ
            </div>

          </div>


          {/* =================================================
              BUTTON
          ================================================= */}

          <button
            className="imsc"
            onClick={downloadCertificate}
          >
            Télécharger l’attestation de congé
          </button>

        </div>

      </div>
    </>
  );
}
