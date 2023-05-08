import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
import SeniorMain from "../pages/SeniorMainPage";
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
import SeniorMealMain from "../pages/SeniorMealMain";
import SeniorSummaryDailyPage from "../pages/SeniorSummaryDailyPage";
import { AnimatePresence } from "framer-motion";

import GuardianMain from "../pages/GuardianMainPage";
function Router() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join/guardian" element={<GuardianJoinPage />} />
          <Route path="/auth/kakao" element={<KakaoAuthPage />} />
          <Route path="/join/senior" element={<SeniorJoinPage />} />
          <Route path="/senior/main" element={<SeniorMain />} />
          <Route path="/senior/myPage" element={<SeniorMypage />} />
          <Route path="/senior/pill" element={<SeniorPillMain />} />
          <Route path="/senior/pill/detail/:id" element={<SeniorPillDetail />} />
          <Route path="/senior/pill/bill" element={<SeniorPillBill />} />
          <Route path="/senior/pill/self" element={<SeniorPillSelf />} />
          <Route path="/senior/schedule" element={<SeniorSchedule />} />
          <Route path="/senior/summary" element={<SeniorSummaryPage />} />
          <Route path="/senior/meal/add" element={<SeniorMealCheckPage />} />
          <Route path="/senior/summary/day" element={<SeniorSummaryDailyPage />} />
          <Route path="/senior/exercise" element={<SeniorExerciseMainPage />} />
          <Route path="/senior/exercise/add" element={<SeniorExercise />} />
          <Route path="/senior/meal" element={<SeniorMealMain />} />
        <Route path="/guardian/main" element={<GuardianMain />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default Router;
