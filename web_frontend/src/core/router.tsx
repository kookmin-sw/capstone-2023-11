import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
import SeniorMain from "../components/SeniorMain";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/senior/myPage" element={<SeniorMypage />} />
        <Route path="/schedule" element={<SeniorSchedule />} />
        <Route path="/senior/main" element={<SeniorMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
