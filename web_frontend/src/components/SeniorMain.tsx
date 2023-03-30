import styled from "styled-components";
import Pill from "./SeniorMainPill";

function SeniorMai() {
  return (
    <>
      <StHeader>
        <StUser src={require("../assets/images/img_avatar.png")}></StUser>
      </StHeader>
      <MenuList>
        <StMainItem>
          <Pill />
        </StMainItem>
        <StMainItem>
          <StItemHeader>💯 내 건강 점수는 몇점?</StItemHeader>
          <WhiteButton>건강 분석하러 가기</WhiteButton>
        </StMainItem>
        <StMainItem>
          <StItemHeader>🍽 식단 ⛳️ 운동</StItemHeader>
          <WhiteButton>끼니 추가하러 가기</WhiteButton>
          <WhiteButton>운동 기록하러 가기</WhiteButton>
        </StMainItem>
      </MenuList>
    </>
  );
}

const StHeader = styled.header`
  font-size: 2rem;
  display: flex;
  width: 100%;
  padding: 3rem 1rem 0 1rem;
`;

const StUser = styled.img`
  margin-left: auto;
  width: 7rem;
  height: 7rem;
  display: flex;
  &:hover {
    color: gray;
  }
`;

const MenuList = styled.ul`
  padding: 0 1rem 3rem 1rem;
`;

const StItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0rem 0rem 0rem 0rem;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
`;

const StMainItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.4rem 1.6rem;
  gap: 1.6rem;
  border: 0;
  background-color: transparent;
`;

export const WhiteButton = styled.button`
  display: flex;
  padding: 2.5rem;
  align-items: center;
  width: 100%;
  height: 2rem;
  color: #006ffd;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  background-color: white;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
`;

export default SeniorMai;
