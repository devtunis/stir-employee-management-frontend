import axios from "../axiosClient/axios.js"
export const use  = async(url,methode,body)=>{
      let data 
      let err = null

    try{
      

      switch(methode){
        case "get":{
           data = await axios.get(url,{})
           
           break
        }
         case "post":{
           data = await axios.post(url,body)
           break
        }
         case "delete":{
           data = await axios.delete(url,body)
           break
        }
      
      }
   

    }catch(error){
      err =error?.response.data
    }
    return {
      data,
      err
    }
     
 }
