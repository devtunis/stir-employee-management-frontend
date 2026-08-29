 


import{ useEffect, useState } from "react";
import "./Login.css";
import axios from  "../axiosClient/axios.js" 
import Lodaer from "../Component/Lodaer";
import { useNavigate } from "react-router-dom";
import { useStoreauth } from "../useStore/UseStoreContext.jsx";
const Login = ()=> {
  
  const v  = useStoreauth()
  


  const Nav = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loading,SetLoading] = useState(false)
  const [state,setState] = useState({
    cin:'',
    pass:'1234'
  })
  const HandelLogin = async(e) =>{
    e.preventDefault()
    SetLoading(true)
    try{
     
      const response = await axios.post("/auth/login/v1",{
        "cin":state.cin,
        "password":state.pass
      },
    )
    
    v?.Set_state({
      cin :response.data.data.cin, 
      nom  :response.data.data.nom,
      prenom:response.data.data.prenom
      
    })
    Nav("/organizations")
      
    }catch(err){
      console.log(err.response)
       
    }finally{
        SetLoading(false)
    }
  }


  return (

    <>  {loading && <Lodaer/>   } 
    <div className="stir-login-page">
      <div className="stir-login-card">

        {/* =========================
            TOP / BRAND
        ========================== */}
        <div className="stir-brand">
          <div className="stir-logo">
            <div className="stir-logo-mark">
              <span className="stir-logo-dot"></span>
              <span className="stir-logo-text">STIR</span>
            </div>
          </div>

          <div className="stir-company">
            <div>Société Tunisienne des</div>
            <div>Industries de Raffinage</div>
          </div>
        </div>

        {/* =========================
            REFINERY IMAGE
        ========================== */}
        <div className="stir-refinery">
          <img
            src="/loginPic/stir.PNG"
            alt="Raffinerie STIR"
          />
        </div>

        {/* =========================
            CONTENT
        ========================== */}
        <div className="stir-content">

          <div className="stir-red-line"></div>

          <h1>Bienvenue</h1>

          <p className="stir-description">
            Connectez-vous à votre espace
            <br />
            pour accéder à votre compte
          </p>

          {/* EMAIL */}
          <div className="stir-field">
            <label>Cin</label>

            <div className="stir-input">
              <svg
          className="stir-input-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* ID card */}
          <rect x="3" y="5" width="18" height="14" rx="2" />

          {/* Person */}
          <circle cx="8" cy="10" r="1.7" />
          <path d="M5.8 15c.5-1.5 1.3-2.2 2.2-2.2s1.7.7 2.2 2.2" />

          {/* Card information */}
          <path d="M13 9h5" />
          <path d="M13 12h5" />
          <path d="M13 15h3.5" />
        </svg>

              <input
                type="text"
                placeholder="votre cin"
                onInput={(e)=>setState({...state,cin:e.target.value})}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="stir-field stir-password-field">
            <label>Mot de passe</label>

            <div className="stir-input">

              <svg
                className="stir-input-icon"
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
               onInput={(e)=>setState({...state,pass:e.target.value})}
              
              />

              <button
                type="button"
                className="stir-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                  <circle cx="12" cy="12" r="2.7" />
                </svg>
              </button>

            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="stir-forgot">
            <a href="/forgot-password">
              Mot de passe oublié ?
            </a>
          </div>

          {/* LOGIN */}
          <button className="stir-login-button"  onClick={(e)=>HandelLogin(e)}>
            Se connecter
          </button>

          {/* DIVIDER */}
          <div className="stir-divider">
            <span></span>
            <p>OU</p>
            <span></span>
          </div>

          {/* GOOGLE */}
          <button className="stir-google-button">

            <span className="google-g">
              G
            </span>

            <span>
              Continuer avec Google
            </span>

          </button>

          {/* REGISTER */}
          <div className="stir-register">
            <span>
              Vous n'avez pas de compte ?
            </span>

            <a href="/register">
              Créer un compte
            </a>
          </div>

        </div>
      </div>
    </div>
     </>
  );
}

export default Login
