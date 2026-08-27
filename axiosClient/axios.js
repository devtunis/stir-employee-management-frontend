// 
import axios from 'axios';
const  EndPointUrl = import.meta.env.VITE_API_BASE_URL;
const apiClient = axios.create({
  
  baseURL: EndPointUrl ,
  timeout: 10000,  
  withCredentials:true
 
 
});
 

apiClient.interceptors.response.use(
   (response)=> {
   return response;
  },


   (error)=> {
    let origingalRequest=  error.config
   
     if(error?.response?.data?.message =="missing token" && !origingalRequest._retry){
      origingalRequest._retry = true
      location.href = "/login" 

     }
     
     
     
       return Promise.reject(error);
  }
);


export default apiClient;
