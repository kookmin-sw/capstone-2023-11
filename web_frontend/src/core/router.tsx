import { BrowserRouter, Routes } from "react-router-dom";
import SeniorMain from "../components/SeniorMain";

function Router() {
  return (
    <BrowserRouter>
      <SeniorMain />
      <Routes>{/* <Route path="/home" element={<Homeview />} /> */}</Routes>
    </BrowserRouter>
  );
}

export default Router;
