import styled from "styled-components";
import { Link } from "react-router-dom";
import PillImgUpload from "./ImagePill";

function SeniorPillBill() {
  return (
    <>
      <StHeader>
        <Link to={`/senior/pill`}>
          <StBackBtn>
            <StBackBtnImg src={require("../../assets/images/img_left.png")} />
          </StBackBtn>
        </Link>
        <StTitle>처방전 인식하기</StTitle>
      </StHeader>
      <StBody>
        {/* <StImgButton>
          <StImg src={require("../../assets/images/img_camera.png")} />
        </StImgButton> */}
        <PillImgUpload />
        <StList>
          <StItem>비타민 A</StItem>
          <StItem>비타민 B</StItem>
          <StItem>비타민 C</StItem>
          <StItem>비타민 D</StItem>
          처방전의 약이 맞습니까?
          <BtnWrapper>
            <StButton>네</StButton>
            <StButton>아니요</StButton>
          </BtnWrapper>
        </StList>
      </StBody>
    </>
  );
}

const StHeader = styled.header`
  padding-top: 5rem;
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
  font-family: "Pretendard-Regular";
  padding: 1rem;
`;

// const StImgButton = styled.button`
//   width: 100%;
//   height: 30rem;
//   border: transparent;
//   background-color: white;
//   padding: 3rem;
// `;

// const StImg = styled.img`
//   width: 100%;
//   height: 30rem;
// `;

const StList = styled.ul`
  padding: 2rem;
  border: 0.2rem solid;
  border-radius: 2rem;
  text-align: center;
`;

const StItem = styled.li`
  display: flex;
  padding: 3rem;
  align-items: center;
  height: 5rem;
  margin: 2rem;
  color: #006ffd;
  font-family: "Pretendard-Regular";
  border: 0.15rem solid gray;
  border-radius: 1.2rem;
`;

const BtnWrapper = styled.div``;

const StButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 2rem;
  font-size: 2rem;
  padding: 2rem;
  width: 10rem;
  margin: 2rem 1rem 0 1rem;

  &:active {
    background-color: #0062cc;
    color: #fff;
  }
`;

export default SeniorPillBill;
