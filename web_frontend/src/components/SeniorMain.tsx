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
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StUser = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
  display: flex;
  &:hover {
    color: gray;
  }
`;

const MenuList = styled.ul`
  padding: 3rem;
`;

const StItemHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0rem 0rem 0rem 1rem;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
`;

const MenuItem = styled.li`
  background-color: white;
  width: 100%;
  color: black;
  display: inline-flex;
  margin-left: 1rem;
  margin-bottom: 3rem;
  margin-top: 3rem;
  border-radius: 0.5rem;
  font-size: 2rem;
  &:hover {
    color: gray;
  }
`;

export const WhiteButton = styled.button`
  display: flex;
  padding: 3rem;
  align-items: center;
  width: 100%;
  height: 4rem;
  color: #006ffd;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  background-color: white;
  border: 0.15rem solid gray;
  border-radius: 1.2rem;
`;

export default SeniorMai;
