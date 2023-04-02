import styled from "styled-components";
import { Link } from "react-router-dom";
import ModalPage from "./SeniorPillModal";

function SeniorPillMain() {
  return (
    <>
      <StHeader>
        <Link to={`/senior/main`}>
          <StBackBtn>
            <StBackBtnImg src={require("../../assets/images/img_left.png")} />
          </StBackBtn>
        </Link>
        <StTitle>복용하는 약 목록</StTitle>
      </StHeader>
      <StBody>
        <ModalPage />
        <StPillList>
          <StItem>
            <StItemImgBox>
              <StItemImg src={require("../../assets/images/pillSample.jpg")} />
              <StItemName>무코스타</StItemName>
            </StItemImgBox>
            <StItemContent></StItemContent>
          </StItem>
          <StItem></StItem>
        </StPillList>
      </StBody>
    </>
  );
}

const StHeader = styled.header`
  padding: 5rem 2rem 0 2rem;
  display: flex;
  font-size: 2rem;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
  padding: 0;
`;

const StBackBtnImg = styled.img`
  width: 2rem;
  height: 2rem;
  padding: 0;
`;

const StTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
`;

const StBody = styled.div`
  font-size: 2rem;
  padding: 2rem;
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
  width: 100%;
  height: 18rem;
  border-radius: 2rem;
  align-self: stretch;
  padding: 1rem;
  border: 0.2rem solid #0066ff;
`;

const StItemImgBox = styled.div`
  display: flex;
`;

const StItemImg = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 2rem;
`;

const StItemContent = styled.div``;

const StItemName = styled.div``;

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
