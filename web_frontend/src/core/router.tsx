import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
import SeniorMain from "../components/SeniorMain";
import SeniorSummaryPage from "../pages/SeniorSummaryPage";
import SeniorMealCheckPage from "../pages/SeniorMealCheckPage";
import SeniorPillAdd from "../components/seniorPill/SeniorPillAdd";
import SeniorPillMain from "../components/seniorPill/SeniorPillMain";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/senior/myPage" element={<SeniorMypage />} />
        <Route path="/schedule" element={<SeniorSchedule />} />
        <Route path="/summary" element={<SeniorSummaryPage />} />
        <Route path="/senior/MealCheck" element={<SeniorMealCheckPage />} />
        <Route path="/senior/main" element={<SeniorMain />} />
        <Route path="/senior/pill/add" element={<SeniorPillAdd />} />
        <Route path="/senior/pill" element={<SeniorPillMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
