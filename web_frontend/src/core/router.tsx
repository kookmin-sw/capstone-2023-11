import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
import SeniorMain from "../components/SeniorMain";
import SeniorSummaryPage from "../pages/SeniorSummaryPage";
import SeniorMealCheckPage from "../pages/SeniorMealCheckPage";
import SeniorPillAdd from "../components/seniorPill/SeniorPillAdd";
import SeniorPillMain from "../components/seniorPill/SeniorPillMain";
import SeniorPillDetail from "../components/seniorPill/SeniorPillDetail";
import SeniorPillBill from "../components/seniorPill/SeniorPillBill";
import LoginPage from "../pages/LoginPage";
import KakaoAuthPage from "../pages/KakaoAuthPage";
import SeniorJoinPage from "../pages/SeniorJoinPage";
import GuardianJoinPage from "../pages/GuardianJoinPage";
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
        <Route path="/senior/pill/detail" element={<SeniorPillDetail />} />
        <Route path="/senior/pill/bill" element={<SeniorPillBill />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao" element={<KakaoAuthPage />} />
        <Route path="/join/senior" element={<SeniorJoinPage />} />
        <Route path="/join/guardian" element={<GuardianJoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
