import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

function SplashPage() {
  const navigate = useNavigate();
  setTimeout(() => {
    {
      const accessToken = localStorage.getItem("accessToken");
      const userStatus = localStorage.getItem("userStatus");

      if (accessToken && userStatus == "userGuardian") {
        navigate("/guardian/main");
      } else if (accessToken && userStatus == "userWard") {
        navigate("/senior/main");
      } else {
        navigate("/login");
      }
    }
  }, 2000);
  return (
    <StSplashPage>
      <Helmet>
        <title>복실이에 오신 것을 환영합니다.</title>
      </Helmet>
      <motion.img
        key={require("../assets/images/img_splash.jpeg")}
        src={require("../assets/images/img_splash.jpeg")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </StSplashPage>
  );
}

const StSplashPage = styled.div`
  img {
    width: 100vw;
    height: 100vh;
    max-width: 40rem;
  }
  width: 100vw;
  height: 100vh;
  margin: 0 !important;
`;
export default SplashPage;
