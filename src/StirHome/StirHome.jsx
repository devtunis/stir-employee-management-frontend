import React from "react";
import "./StirHome.css";

const StirHome = () => {
  return (
    <div className="stir-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="site-header">
        <div className="header-inner">

          {/* STIR LOGO */}
          <div className="stir-logo">
            <div className="logo-symbol">
              <span></span>
              <span></span>
            </div>

            <div className="logo-name">
              STIR
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="social-icons">

            <div className="social">f</div>
            <div className="social">♥</div>
            <div className="social">G+</div>
            <div className="social">in</div>
            <div className="social">▶</div>
            <div className="social">A</div>

            <div className="social email">
              ✉
            </div>

          </div>

        </div>
      </header>


      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <nav className="main-nav">

        <div className="nav-inner">

          <a href="#">Accueil</a>

          <a href="#">
            Présentation de la société
          </a>

          <a href="#">
            Activités et Produits
          </a>

          <a href="#">
            Centre de Formation et Stage
          </a>

          <a href="#">
            École du Feu
          </a>

          <a href="#">
            Laboratoire
          </a>

          <a href="#">
            Partenaires
          </a>

          <a href="#">
            Carrière
          </a>

          <input
            type="text"
            className="search"
            placeholder="Recherche"
          />

        </div>

      </nav>


      {/* ==================================================
          REFINERY HERO
      ================================================== */}

      <section className="refinery-hero">

        <img
          src="/homePictuer/reff.png"
          alt="STIR refinery"
          className="refinery-image"
        />

        <div className="hero-title">
          Société Tunisienne des Industries de Raffinage
        </div>

      </section>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="main-container">

        {/* BLUE DOWN ARROW */}

        <div className="down-arrow">
          <span>⌄</span>
        </div>


        {/* ==================================================
            ANNOUNCEMENT
        ================================================== */}

        <div className="announcement">

          <div className="announcement-arabic">
            إعلان عن فتح مناظرة سلك الإطار من عدد
            <strong> 01/25 </strong>
            إلى
            <strong> 14/25 </strong>
            المرحلة الأولى
          </div>

          <div className="announcement-arabic">
            للاطلاع على قائمة المترشحين المدعوين
            لإجراء الاختبار
            <span> على هذا الرابط </span>
          </div>

        </div>


        {/* ==================================================
            THREE ROUND LINKS
        ================================================== */}

        <div className="round-links">

          {/* CENTER FORMATION */}

          <div className="round-link">

            <div className="round-icon yellow">

              <div className="basket-icon">
                ♜
              </div>

            </div>

            <div className="round-label">
              [ Centre de formation ]
            </div>

          </div>


          {/* FIRE SCHOOL */}

          <div className="round-link">

            <div className="round-icon red">

              <div className="screen-icon">
                ▣
              </div>

            </div>

            <div className="round-label fire-label">
              [ École du feu ]
            </div>

          </div>


          {/* LABORATORY */}

          <div className="round-link">

            <div className="round-icon blue">

              <div className="pencil-icon">
                ✎
              </div>

            </div>

            <div className="round-label">
              [ Laboratoire ]
            </div>

          </div>

        </div>


        {/* ==================================================
            FEATURE CARDS
        ================================================== */}

        <div className="feature-row">


          {/* ---------------- ECOLE ---------------- */}

          <div className="feature-card">

            <div className="feature-image">

              <img
                src="https://www.stir.com.tn/upload/1449146968_1445510922_ecole.jpg"
                alt="Ecole"
              />

            </div>

            <div className="feature-name">
              Ecole
            </div>

            <div className="feature-description">
              Le centre de formation à la sécurité
              pétrolière de la STIR
            </div>

            <a href="#" className="detail">
              Détail
            </a>

          </div>


          {/* ---------------- PROGRAMME ---------------- */}

          <div className="feature-card">

            <div className="feature-image">

              <img
                src="https://www.stir.com.tn/upload/1449147081_prog.jpg"
                alt="Programme"
              />

            </div>

            <div className="feature-name">
              Programme
            </div>

            <div className="feature-description">
              Le programme des stages de l'école
              du feu
            </div>

            <a href="#" className="detail">
              Détail
            </a>

          </div>


          {/* ---------------- INSCRIPTION ---------------- */}

          <div className="feature-card">

            <div className="feature-image">

              <img
                src="https://www.stir.com.tn/upload/1449488978_insc.jpg"
                alt="Inscription"
              />

            </div>

            <div className="feature-name">
              Inscription
            </div>

            <a href="#" className="detail">
              Détail
            </a>

          </div>

        </div>


        {/* ==================================================
            CERTIFICATIONS
        ================================================== */}

        <section className="content-section">

          <div className="section-title">
            Certifications
          </div>


          <div className="certification-row">


            {/* CERTIFICATE 1 */}

            <div className="certificate-card">

              <div className="certificate-picture">

                <div className="certificate-word">
                  Certificat
                </div>

                <div className="certificate-main">
                  ISO
                  <br />
                  14001
                </div>

                <div className="certificate-version">
                  Version 2015
                </div>

                <div className="certificate-circle">
                  ✓
                </div>

              </div>


              <div className="certificate-info">

                <div className="certificate-date">
                  05/09/2023
                </div>

                <div>
                  ISO14001 version 2015
                </div>

                <div>
                  La Société Tunisienne des
                  Industries de Raffinage
                  (STIR)
                </div>

              </div>

            </div>


            {/* CERTIFICATE 2 */}

            <div className="certificate-card">

              <div className="certificate-picture">

                <div className="certificate-word">
                  Certificat
                </div>

                <div className="certificate-main">
                  ISO
                  <br />
                  9001
                </div>

                <div className="certificate-version">
                  Version 2015
                </div>

                <div className="certificate-circle">
                  ✓
                </div>

              </div>


              <div className="certificate-info">

                <div className="certificate-date">
                  05/09/2023
                </div>

                <div>
                  ISO 9001 version 2015
                </div>

                <div>
                  La Société Tunisienne des
                  Industries de Raffinage
                  (STIR)
                </div>

              </div>

            </div>


            {/* CERTIFICATE 3 */}

            <div className="certificate-card">

              <div className="certificate-picture arabic-certificate">

                <div>
                  شهادة اعتماد
                </div>

                <div className="certificate-circle">
                  ✓
                </div>

              </div>


              <div className="certificate-info">

                <div className="certificate-date">
                  24/11/2023
                </div>

                <div>
                  ISO 17025 version 2017
                </div>

                <div>
                  La Société Tunisienne des
                  Industries de Raffinage
                  (STIR)
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            APPELS D'OFFRES
        ================================================== */}

        <section className="content-section offers-section">

          <div className="section-title">
            Appels d'offres
          </div>


          <div className="offer-row">

            {/* PDF */}

            <div className="pdf-document">

              <div className="pdf-top">
                PDF
              </div>

              <div className="pdf-page">

                <div className="pdf-fold"></div>

                <div className="pdf-symbol">
                  ♧
                </div>

              </div>

            </div>


            {/* OFFER INFORMATION */}

            <div className="offer-information">

              <div className="offer-date">
                27/02/2025
              </div>

              <div>
                Avis de consultation N°
                53418/2025
              </div>

              <div>
                Désignation d'un réviseur des comptes
              </div>

              <div>
                pour les exercices 2025 - 2026 - 2027
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default StirHome;
