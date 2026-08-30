import   { useState } from "react";
import "./Resigter.css";
import axios from "../axiosClient/axios.js"
import { useNavigate } from "react-router-dom";
import Lodaer from "../Component/Lodaer";

const Resigter = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [loading,SetLoading] = useState(false)
  const [state,SetState] = useState({
    prenom:'',
    nom:'',
    cin:'',
    tlf:'',
    password:''
  })
  const Nav = useNavigate()
  const HandelCreatAccount = async (e)=>{
    SetLoading(true)
    e.preventDefault()
    if(!state.prenom ||  !state.nom || !state.cin || !state.tlf || !state.password){
      alert("missing fields")
      return 
    }
    try{
   
        const ReponseData = await axios.post("/auth/register/v1",{
                "cin":state.cin,
                "nom":state.nom,
                "prenom":state.prenom,
                "tlf":state.tlf,
                "password":state.password
          })

        if(ReponseData){
          
            Nav("/login")
        }
    }catch(err){
        console.log(
            err.response
        )
    }
    finally{
      SetLoading(false)
    }

    
    
  }
  return (
    <>  
     {loading && <Lodaer/>   } 
    <div className="register-page">
      <div className="register-card">

        {/* Header */}
        <div className="register-header">

          <button className="back-button" type="button">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 12H5" />
              <path d="M11 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="stir-brand">
            <div className="stir-logo">
              <span className="stir-dot"></span>
              <span className="stir-text">STIR</span>
            </div>

            <div className="stir-name">
              <span>Société Tunisienne des</span>
              <span>Industries de Raffinage</span>
            </div>
          </div>

        </div>

        {/* Decorative company icon */}
        <div className="company-decoration">
          <div className="company-circle">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 56V22h27v34" />
              <path d="M39 32h13v24H39" />
              <path d="M18 22V14h15v8" />
              <path d="M24 14V8h6v6" />
              <path d="M20 29h4" />
              <path d="M29 29h4" />
              <path d="M20 37h4" />
              <path d="M29 37h4" />
              <path d="M20 45h4" />
              <path d="M29 45h4" />
              <path d="M45 39h3" />
              <path d="M45 46h3" />
              <path d="M24 56V47h6v9" />
            </svg>
          </div>
        </div>

        {/* Main content */}
        <div className="register-content">

          <div className="register-red-line"></div>

          <h1>Créer un compte</h1>

          <p className="register-description">
            Rejoignez-nous en remplissant
            <br />
            les informations ci-dessous
          </p>

          <form>

            {/* First row */}
            <div className="form-row">

              {/* First name */}
              <div className="form-group">
                <label>Prénom</label>

                <div className="input-box">
                  <svg
                    className="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5" />
                  </svg>

                  <input
                    type="text"
                    style={{
                      textAlign:"center"
                    }}
                    placeholder="Votre prénom"
                    onInput={(e)=>SetState({
                        ...state ,
                        prenom :e.target.value
                    })}
                  />
                </div>
              </div>

              {/* Last name */}
              <div className="form-group">
                <label>Nom</label>

                <div className="input-box">
                  <svg
                    className="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5" />
                  </svg>

                  <input
                    type="text"
                    placeholder="Votre nom"
                     style={{
                      textAlign:"center"
                    }}
                    onInput={(e)=>SetState({
                        ...state ,
                        nom : e.target.value
                    })}
                  />
                </div>
              </div>

            </div>

            {/* Email */}
            <div className="form-group full-width">
              <label>Cin</label>

              <div className="input-box">
              

                <input
                  type="text"
                  placeholder="votre cin"
                   style={{
                      textAlign:"center"
                    }}
                     onInput={(e)=>SetState({
                        ...state ,
                        cin : e.target.value
                    })}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group full-width">
              <label>Téléphone</label>

              <div className="input-box">
                <svg
                  className="field-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M7 4l3 3-2 3c1.3 2.7 3.3 4.7 6 6l3-2 3 3-2 3c-.7.7-1.8 1-2.8.7C10.1 19.1 4.9 13.9 3.3 6.7 3 5.7 3.3 4.7 4 4z" />
                </svg>

                <input
                  type="tel"
                  placeholder="22 123 456"
                     onInput={(e)=>SetState({
                        ...state ,
                        tlf : e.target.value
                    })}
                />
              </div>
            </div>

            {/* Password row */}
            <div className="form-row">

              {/* Password */}
              <div className="form-group">
                <label>Mot de passe</label>

                <div className="input-box">

                  <svg
                    className="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="11"
                      rx="2"
                    />
                    <path d="M8 10V7a4 4 0 018 0v3" />
                  </svg>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••••"
                     onInput={(e)=>SetState({
                        ...state ,
                        password : e.target.value
                    })}
                  />

                  <button
                    type="button"
                    className="eye-button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </button>

                </div>
              </div>

              {/* Confirm password */}
             
            </div>

            {/* Terms */}
            <div className="terms">
              <input
                type="checkbox"
                id="terms"
              />

              <label htmlFor="terms">
                J'accepte les{" "}
                <a href="#">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="#">
                  politique de confidentialité
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              onClick={(e)=>HandelCreatAccount(e)}
              className="create-button"
            >
              Créer mon compte
            </button>

          </form>

          {/* Bottom login */}
          <div className="already-account">
            <span>
              Vous avez déjà un compte ?
            </span>

            <a href="/login">
              Se connecter
            </a>
          </div>

        </div>

      </div>
    </div>
    </>
  );
};

export default Resigter;