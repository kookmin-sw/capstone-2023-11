import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
import SeniorMain from "../components/SeniorMain";
import SeniorSummaryPage from "../pages/SeniorSummaryPage";

import SeniorPillMain from "../pages/SeniorPillMainPage";
import SeniorPillDetail from "../pages/SeniorPillDetailPage";
import SeniorPillBill from "../pages/SeniorPillBillAddPage";
import LoginPage from "../pages/LoginPage";
import KakaoAuthPage from "../pages/KakaoAuthPage";
import SeniorJoinPage from "../pages/SeniorJoinPage";
import GuardianJoinPage from "../pages/GuardianJoinPage";
import SeniorPillSelf from "../pages/SeniorPillSelfAddPage";

import SeniorMealCheckPage from "../pages/SeniorMealCheckPage";
import SeniorExercise from "../pages/SeniorExerciseAddPage";
import SeniorExerciseMainPage from "../pages/SeniorExericseMainPage";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/senior/myPage" element={<SeniorMypage />} />
        <Route path="/schedule" element={<SeniorSchedule />} />
        <Route path="/summary" element={<SeniorSummaryPage />} />
        <Route path="/senior/main" element={<SeniorMain />} />
        <Route path="/senior/pill" element={<SeniorPillMain />} />
        <Route path="/senior/pill/detail/:id" element={<SeniorPillDetail />} />
        <Route path="/senior/pill/bill" element={<SeniorPillBill />} />
        <Route path="/senior/pill/self" element={<SeniorPillSelf />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao" element={<KakaoAuthPage />} />
        <Route path="/join/senior" element={<SeniorJoinPage />} />
        <Route path="/senior/schedule" element={<SeniorSchedule />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao" element={<KakaoAuthPage />} />
        <Route path="/join/senior" element={<SeniorJoinPage />} />
        <Route path="/senior/summary" element={<SeniorSummaryPage />} />
        <Route path="/senior/MealCheck" element={<SeniorMealCheckPage />} />
        <Route path="/join/guardian" element={<GuardianJoinPage />} />
        <Route path="/senior/exercise/add" element={<SeniorExercise />} />
        <Route path="/senior/exercise" element={<SeniorExerciseMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
