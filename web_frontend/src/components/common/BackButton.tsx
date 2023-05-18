import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const StButtonBack = styled(motion.img)`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <StButtonBack
        whileTap={{ scale: 0.8 }}
        src={require("../../assets/images/img_left.png")}
        onClick={() => navigate(-1)}></StButtonBack>
    </>
  );
};

export default BackButton;
