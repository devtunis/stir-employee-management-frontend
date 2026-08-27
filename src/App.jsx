 
 import {Routes,Route} from "react-router-dom" 
import Login from './auth/Login'
import Resigter from './auth/Resigter'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard/Dashboard'
import AdminRequests from './Pages/AdminRequests/AdminRequests'
import AdminRequestDetail from './Pages/AdminRequestDetail/AdminRequestDetail'
import CreateOrganization from './Pages/createOrganization.jsx/CreateOrganization'
import Certificate from "./Certifacte/Certificate"
import   CalendarComp from "./Component/CalendarComp"
 
 
// hey chat do react.lazy laoading and wrap all  it with suposne with this componet <STIRLoader/>
 const App = () => {
   return (
     <>
      
      <Routes>
         <Route path='/login' element={<Login/>}/>
         <Route path='/resigter' element={<Resigter/>}/>
          <Route path='/organizations' element={<Home/>}/>
          <Route path='/organizations/createOrganization' element={<CreateOrganization/>}/> 
          <Route path='/organizations/:roomId' element={<Dashboard/>}/>
                  
     
         <Route path='/organizations/admin/:roomId' element={<AdminRequests/>}/>
         
           <Route path='/test' element={<Certificate/>}/>

        <Route path='/test2' element={<CalendarComp/>}/>
        
      </Routes>
     </>
   )
 }
 
 export default App