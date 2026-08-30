import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

 
const Login = lazy(() => import("./auth/Login"));
const Resigter = lazy(() => import("./auth/Resigter"));
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const AdminRequests = lazy(() => import("./Pages/AdminRequests/AdminRequests"));
 
const CreateOrganization = lazy(() =>
  import("./Pages/createOrganization.jsx/CreateOrganization")
);
const Certificate = lazy(() => import("./Certifacte/Certificate"));
const StirHome  = lazy(()=>import("./StirHome/StirHome"))

const  Firstview = lazy(()=>import("./StirHome/StirHome"))


import STIRLoader from "./Component/StirLoader";
import News from "./New/News";

const App = () => {
  return (
    <>
      <Suspense fallback={<STIRLoader />}>
        <Routes>
          
        <Route path="/" element={<Firstview />} />
          <Route path="/login" element={<Login />} />

          <Route path="/resigter" element={<Resigter />} />

          <Route path="/organizations" element={<Home />} />

          <Route
            path="/organizations/createOrganization"
            element={<CreateOrganization />}
          />

          <Route path="/organizations/:roomId" element={<Dashboard />} />

          <Route
            path="/organizations/admin/:roomId"
            element={<AdminRequests />}
          />

          <Route path="/attestation/:roomid" element={<Certificate />} />

          <Route path="/test2" element={<StirHome/>} />  

           <Route path="/news/organization/:roomid" element={<News />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
