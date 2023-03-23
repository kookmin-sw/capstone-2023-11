import styled from "styled-components";
import Pill from "./SeniorMainPill";

function SeniorMai() {
  return (
    <>
      <StHeader>
        <StUser>아이콘</StUser>
      </StHeader>
      <MenuList>
        <StMainItem>
          <Pill />
          <StItemHeader>내 건강 점수는 몇점?</StItemHeader>
          <WhiteButton>건강 분석하러 가기</WhiteButton>
          <StItemHeader>식단, 운동</StItemHeader>
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
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const StUser = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
  display: flex;
  &:hover {
    color: gray;
  }
`;

const MenuList = styled.ul``;

const StItemHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0rem 0rem 0rem 1rem;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
`;

const StMainItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.4rem 1.6rem;
  gap: 3rem;
  border: 0;
  background-color: transparent;
`;

export const WhiteButton = styled.button`
  display: flex;
  padding: 3rem;
  align-items: center;
  width: 32.7rem;
  height: 4.8rem;
  color: #006ffd;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  background-color: white;
  border: 0.15rem solid gray;
  border-radius: 1.2rem;
`;

export default SeniorMai;
