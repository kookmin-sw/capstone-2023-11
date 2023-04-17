import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSeniorInfo } from "../core/api";
import Pill from "./SeniorMainPill";

function SeniorMain() {
  const [info, setInfo] = useState<MainInfo>();
  useEffect(() => {
    async function fetchData() {
      const data = await getSeniorInfo();
      setInfo(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <StHeader>
        <StUserContent>
          <StUser src={require("../assets/images/img_avatar.png")}></StUser>
          <StUsercode>{info?.userCode}</StUsercode>
        </StUserContent>
      </StHeader>
      <MenuList>
        <StMainItem>
          <Pill />
        </StMainItem>
        <StMainItem>
          <StItemHeader>💯 내 건강 점수는 몇점?</StItemHeader>
          <ItemContent>
            <ItemImgWrapper>
              <ItemImg src={require(`../assets/icons/icon_score.png`)} />
            </ItemImgWrapper>
            <ItemTextContainer>
              <ItemTitle>건강 분석하러 가기</ItemTitle>
              <ItemComment>4/14에 기록된 딸기님의 점수는 xx입니다.</ItemComment>
            </ItemTextContainer>
          </ItemContent>
        </StMainItem>
        <StMainItem>
          <StItemHeader>🗓 나의 건강 일지</StItemHeader>
          <ItemContent>
            <ItemImgWrapper>
              <ItemImg src={require(`../assets/icons/icon_calendar.png`)} />
            </ItemImgWrapper>
            <ItemTextContainer>
              <ItemTitle>나의 건강 기록 보러가기</ItemTitle>
              <ItemComment>이번달에는 {info?.monthRecordCount}개의 기록을 남기셨습니다.</ItemComment>
            </ItemTextContainer>
          </ItemContent>
        </StMainItem>
        <StMainItem>
          <StItemHeader>🍽 ⛳️ 식단 운동</StItemHeader>
          <WhiteButton2>
            <IconImg src={require(`../assets/icons/icon_meal.png`)} style={{ backgroundColor: "#feecdc" }} />
            오늘, {info?.todayMealCount}번의 식사를 기록했습니다!
          </WhiteButton2>
          <WhiteButton2>
            <IconImg src={require(`../assets/icons/icon_exercise.png`)} style={{ backgroundColor: "#87dd79" }} />
            오늘, {info?.todayWorkOutCount}번의 운동을 기록했습니다!
          </WhiteButton2>
        </StMainItem>
      </MenuList>
    </>
  );
}

interface MainInfo {
  userCode: number;
  medicineInfoList: [
    {
      id: number;
      name: string;
      companyName: string;
      effect: string;
      useMethod: string;
      caution: string;
      depositMethod: string;
      imageUrl: string;
      createdAt: string;
      dueAt: string;
      remainDay: number;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
    },
  ];
  monthRecordCount: number;
  todayMealCount: number;
  todayWorkOutCount: number;
}

const StHeader = styled.header`
  font-size: 2rem;
  display: flex;
  width: 100%;
  padding: 4rem 2rem 0 2rem;
`;

const StUser = styled.img`
  width: 7rem;
  height: 7rem;
  display: flex;
  margin-left: auto;
  &:hover {
    color: gray;
  }
`;

const StUsercode = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Regular";
`;

const StUserContent = styled.div`
  margin-left: auto;
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
  padding: 0rem 1.6rem 2rem 1.6rem;
  gap: 1.6rem;
  border: 0;
  background-color: transparent;
`;

const ItemImgWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 23%;
  background-color: #b4dbff;
  padding: 1rem 0rem;
  border-radius: 1.2rem 0rem 0rem 1.2rem;
`;

const ItemImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

const ItemContent = styled.button`
  display: flex;
  position: relative;
  padding: 3.5rem 2rem;
  align-items: center;
  width: 100%;
  height: 2rem;
  color: black;
  font-family: "Pretendard-Regular";
  font-size: 1.6rem;
  background-color: #eaf2ff;
  border: 0;
  border-radius: 1.2rem;
`;

const ItemTextContainer = styled.div`
  text-align: left;
  margin-left: 6.5rem;
`;

const ItemTitle = styled.div`
  color: black;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  margin-bottom: 0.5rem;
`;

const ItemComment = styled.div`
  color: #71727a;
  font-family: "Pretendard-Regular";
  font-size: 1.3rem;
`;

const WhiteButton2 = styled.div`
  display: flex;
  padding: 3rem 1.2rem 3rem 1.2rem;
  align-items: center;
  width: 100%;
  height: 2rem;
  color: black;
  font-family: "Pretendard-Regular";
  font-size: 1.6rem;
  background-color: white;
  border: 0.15rem solid #f1f5f9;
  border-radius: 1.2rem;
`;

const IconImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.8rem;
`;

// const StLink = styled(Link)`
//   text-decoration: none;
//   color: black;
//   display: flex;
// `;

export default SeniorMain;
