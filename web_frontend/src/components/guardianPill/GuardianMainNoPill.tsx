import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NoPill(prop: string) {
  return (
    <StPill whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      <StLink to={`/senior/pill`}>
        <StNoPill>
          <StContent>현재 관찰중인 {prop ? prop : "김딸기"}님은</StContent>
          <StContent>복용중인 약이 없습니다</StContent>
        </StNoPill>
      </StLink>
    </StPill>
  );
}

const StPill = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const StNoPill = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  width: 100%;
  height: 10rem;
  background: #eaf2ff;
  flex: none;
  flex-grow: 0;
  background-color: #eaf2ff;
  border: 0;
  border-radius: 1.6rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  width: 100%;
`;

const StContent = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  margin-top: 2.5rem;
`;

export default NoPill;
