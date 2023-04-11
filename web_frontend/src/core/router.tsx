import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
// import SeniorMain from "../components/SeniorMain";
import LoginPage from "../pages/LoginPage";
import KakaoAuthPage from "../pages/KakaoAuthPage";
import SeniorJoinPage from "../pages/SeniorJoinPage";
import SeniorSummaryPage from "../pages/SeniorSummaryPage";
import GuardianJoinPage from "../pages/GuardianJoinPage";
import SeniorExercise from "../pages/SeniorExerciseAddPage";
import SeniorExerciseMainPage from "../pages/SeniorExericseMainPage";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/senior/myPage" element={<SeniorMypage />} />
        <Route path="/senior/schedule" element={<SeniorSchedule />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao" element={<KakaoAuthPage />} />
        <Route path="/join/senior" element={<SeniorJoinPage />} />
        <Route path="/senior/summary" element={<SeniorSummaryPage />} />
        <Route path="/join/guardian" element={<GuardianJoinPage />} />
        <Route path="/senior/exercise/add" element={<SeniorExercise />} />
        <Route path="/senior/exercise" element={<SeniorExerciseMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
