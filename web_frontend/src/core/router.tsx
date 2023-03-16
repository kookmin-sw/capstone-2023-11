import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
// import SeniorMain from "../components/SeniorMain";
import LoginPage from "../pages/LoginPage";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/senior/myPage" element={<SeniorMypage />} />
        <Route path="/schedule" element={<SeniorSchedule />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
