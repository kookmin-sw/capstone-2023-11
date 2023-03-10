import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/senior/myPage" element={<SeniorMypage />} />
        {/* <Route path="/home" element={<Homeview />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
