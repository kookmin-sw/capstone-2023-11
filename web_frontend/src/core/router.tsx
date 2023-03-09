import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/schedule" element={<SeniorSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
