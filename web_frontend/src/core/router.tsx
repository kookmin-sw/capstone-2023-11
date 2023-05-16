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
import SeniorPillSelf from "../pages/SeniorPillSelfAddPage";
import SeniorMealCheckPage from "../pages/SeniorMealCheckPage";
import SeniorExercise from "../pages/SeniorExerciseAddPage";
import SeniorExerciseMainPage from "../pages/SeniorExericseMainPage";
import SeniorMealMain from "../pages/SeniorMealMain";
import SeniorSummaryDailyPage from "../pages/SeniorSummaryDailyPage";
import { AnimatePresence } from "framer-motion";
import GuardianJoinPage from "../pages/GuardianJoinPage";
import SeniorJoinPage from "../pages/SeniorJoinPage";
import SplashPage from "../pages/SplashPage";
import BottomNavSenior from "../components/common/BottomNavSenior";
import SeniorModifyPage from "../pages/SeniorModifyPage";

import GuardianMain from "../pages/GuardianMainPage";
import BottomNavGuardian from "../components/common/BottomNavGuardian";
import GuardianExerciseViewPage from "../pages/GuardianExerciseMainViewPage";
import GuardianMealMainViewPage from "../pages/GuardianMealMainViewPage";
import GuardianSummaryDailyPage from "../pages/GuardianSummaryDailyPage";
import GuardianSummaryPage from "../pages/GuardianSummaryPage";
import GuardianPillMainViewPage from "../pages/GuardianPillMainViewPage";
import GuardianTotal from "../pages/GuardianMainViewPage";
function Router() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join/guardian" element={<GuardianJoinPage />} />
          <Route path="/auth/kakao" element={<KakaoAuthPage />} />
          <Route path="/join/senior" element={<SeniorJoinPage />} />
          <Route path="/modify/senior" element={<SeniorModifyPage />} />
          <Route element={<BottomNavSenior />}>
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
          </Route>
          <Route path="/guardian/main" element={<GuardianMain />} />
          <Route element={<BottomNavGuardian />}>
            <Route path="/guardian/:id/exercise" element={<GuardianExerciseViewPage />} />
            <Route path="/guardian/:id/meal" element={<GuardianMealMainViewPage />} />
            <Route path="/guardian/:id/summary/day" element={<GuardianSummaryDailyPage />} />
            <Route path="/guardian/:id/summary" element={<GuardianSummaryPage />} />
            <Route path="/guardian/:id/pill" element={<GuardianPillMainViewPage />} />
            <Route path="/guardian/:id/main" element={<GuardianTotal />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default Router;
