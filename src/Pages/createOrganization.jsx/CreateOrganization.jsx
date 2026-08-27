import   { useState } from "react";
import {
  Building2,
  X,
 
} from "lucide-react";

import "./CreateOrganization.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosClient/axios.js";
import STIRLoader from "../../Component/StirLoader.jsx";

export default function CreateOrganization() {

  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    activity: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    manager: "",
    description: "",
  });


  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
  
    if (file) {
      setLogo(file);
    }
  };

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();
    const {activity,name} =  formData
  
    const response = await axios.post("/ogranization/create/v1",{
    "nameOrganization" :name,
    "activity":activity
    })
    console.log(response)
    setLoading(false)
    if(response.status===200){
      Nav("/organizations")
    }
    

    
    // API call here
  };

  const Nav  = useNavigate()

  return (
    <>
    
   
   {
    loading &&  <STIRLoader/>
   }
    <div className="create-organization-overlay">

      <div className="create-organization-modal">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="create-organization-header">

          <div className="create-title-wrapper">

            <div className="create-title-icon">
              <Building2 size={21} />
            </div>

            <div>
              <h2>
                Nouvelle organisation
              </h2>

              <p>
                Créez une nouvelle organisation
              </p>
            </div>

          </div>


          <button
            type="button"
            className="close-create-modal"
            
          >
            <X size={19} />
          </button>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="create-organization-form"
          onSubmit={handleSubmit}
        >


          {/* =================================================
              GENERAL INFORMATION
          ================================================= */}

          <div className="form-section">

            <div className="form-section-title">

              <Building2 size={16} />

              <span>
                Informations générales
              </span>

            </div>


            <div className="form-grid">


              {/* NAME */}

              <div className="form-group">

                <label>
                  Nom de l'organisation
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex : Maintenance Industrielle"
                  required
                />

              </div>


           


              {/* ACTIVITY */}

              <div className="form-group">

                <label>
                  Secteur d'activité
                  <span>*</span>
                </label>

                <select
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Sélectionner un secteur
                  </option>

                  <option value="industrie">
                    Industrie
                  </option>

                  <option value="informatique">
                    Informatique & Digital
                  </option>

                  <option value="logistique">
                    Logistique
                  </option>

                  <option value="finance">
                    Finance
                  </option>

                  <option value="ressources-humaines">
                    Ressources Humaines
                  </option>

                  <option value="laboratoire">
                    Laboratoire
                  </option>

                  <option value="autre">
                    Autre
                  </option>

                </select>

              </div>


              {/* MANAGER */}

             

            </div>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          {/* <div className="form-section">

            <div className="form-section-title">

              <Phone size={16} />

              <span>
                Coordonnées
              </span>

            </div>


            <div className="form-grid">


         

 

              <div className="form-group form-full">

                <label>
                  Site web
                </label>

                <div className="input-with-icon">

                  <Globe size={15} />

                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.example.tn"
                  />

                </div>

              </div>

            </div>

          </div> */}


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          

          {/* =================================================
              LOGO
          ================================================= */}

          {/* <div className="form-section">

            <div className="form-section-title">

              <Upload size={16} />

              <span>
                Logo
              </span>

            </div>


            <label className="logo-upload">

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleLogoChange}
              />

              <Upload size={20} />

              <strong>
                {logo
                  ? logo.name
                  : "Télécharger le logo"}
              </strong>

              <span>
                PNG, JPG ou WEBP — maximum 2 MB
              </span>

            </label>

          </div> */}


          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="create-form-footer">

            <button
              type="button"
              className="cancel-create"
              onClick={()=>Nav("/organizations")}
            >
              Annuler
            </button>


            <button
              type="submit"
              className="submit-create"
            >
              <Building2 size={16} />

              Créer l'organisation
            </button>

          </div>

        </form>

      </div>

    </div>
     </>
  );
}