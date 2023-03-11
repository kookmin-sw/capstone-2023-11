
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
import SeniorMain from "../components/SeniorMain";


function Router() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/schedule" element={<SeniorSchedule />} />
      </Routes>
      <SeniorMain />
    </BrowserRouter>
  );
}

export default Router;
