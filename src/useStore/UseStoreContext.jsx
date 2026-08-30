import { createContext,useContext, useState, useEffect } from "react";
import axios from "../axiosClient/axios.js"
import { useNavigate } from "react-router-dom";

 
const ProduceData = createContext()
 
const UseStoreContext = ({children}) => {
    const Nav = useNavigate()
    const [state,Set_state]  = useState(
         {
            cin : null , 
        nom:null,
        prenom:null,
         }

    )

    

    useEffect(()=>{
        if (location.pathname === "/login" || location.pathname=="/register") {
        return;
    }
        if(!state.cin){
             const HandelRefreshData = async()=>{
                   const response = await axios("/getmyaata/v1")
                     
                     
                       
                        if(response.status ==200){
                            Set_state({
                            cin : response?.data?.RefreshInfo?.cin,
                            nom : response?.data?.RefreshInfo?.nom,
                            prenom : response?.data?.RefreshInfo?.prenom

                        })
                        }else{
                          
                             

                            Nav("/login")
                           
                        }
                 
             
        }
        HandelRefreshData()
        }
   
    },[])


  return (
    <ProduceData.Provider value={{state,Set_state}}
    >

    {children}
    </ProduceData.Provider>

    
  )
}
export const useStoreauth  = ()=> useContext(ProduceData)


export default UseStoreContext