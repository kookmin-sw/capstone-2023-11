import styled from "styled-components";
import { Link } from "react-router-dom";
import ModalPage from "./SeniorPillModal";

function SeniorPillMain() {
  return (
    <>
      <StHeader>
        <Link to={`/senior/main`}>
          <StBackBtn>{"<"}</StBackBtn>
        </Link>
        <StTitle>복용하는 약 목록</StTitle>
      </StHeader>
      <StBody>
        <StPillList>
          <StItem>아스피린</StItem>
          <StItem></StItem>
        </StPillList>
        <ModalPage />
      </StBody>
    </>
  );
}

const StHeader = styled.header`
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  font-size: 2rem;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
`;

const StTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
`;

const StBody = styled.div`
  font-size: 2rem;
`;

const StPillList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 2rem;
  padding: 2rem;
`;

const StItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: #f8f9fe;
  border-radius: 2rem;
  align-self: stretch;
  font-family: "Pretendard-Bold";
  padding: 3rem;
`;

// const StAddButton = styled.button`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   width: 100%;
//   height: 5rem;
//   background-color: #006ffd;
//   border-radius: 2rem;
//   align-self: stretch;
//   text-align: center;
//   font-family: "Pretendard-Bold";
//   padding: 3rem;
//   border: transparent;
//   color: white;
// `;

export default SeniorPillMain;
