import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSeniorInfo } from "../core/api";
import NoPill from "./SeniorMainNoPill";
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

  console.log(info);
  return (
    <STContainer>
      <StHeader>
        <StUserContent>
          <StUser src={require("../assets/images/img_avatar.png")}></StUser>
          <StUsercode>{info?.userName ? info?.userName : "xxx"}</StUsercode>
        </StUserContent>
      </StHeader>
      <MenuList>
        <StMainItem>
          <StPillHeader>
            <StItemHeader>💊 복용하는 약</StItemHeader>
            <StLink to={`/senior/pill`}>
              <StPillAddBtn>자세히 보기</StPillAddBtn>
            </StLink>
          </StPillHeader>
          {info?.medicineInfoList?.length ?? 0 >= 1 ? <Pill /> : <NoPill />}
        </StMainItem>
        <StMainItem>
          <StItemHeader>💯 내 건강 점수는 몇점?</StItemHeader>
          <ItemContent>
            <ItemImgWrapper>
              <ItemImg src={require(`../assets/icons/icon_score.png`)} />
            </ItemImgWrapper>
            <ItemTextContainer>
              <ItemTitle>건강 분석하러 가기</ItemTitle>
              <ItemComment>
                4/14에 기록된 {info?.userName ? info?.userName : "xx"}님의 점수는 <br />
                xx입니다.
              </ItemComment>
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
              <ItemComment>
                이번달에 {info?.userName ? info?.userName : "xx"}님은 <br />
                {info?.monthRecordCount ? info?.monthRecordCount : "xx"}개의 기록을 남기셨습니다.
              </ItemComment>
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
    </STContainer>
  );
}

interface MainInfo {
  userCode: number;
  userName: string;
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

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
`;

const STContainer = styled.div`
  padding: 3rem 2rem;
  justify-content: center;
  margin: 1rem auto;
`;

const StHeader = styled.header`
  font-size: 2rem;
  display: flex;
  width: 100%;
  padding: 0rem 2rem 0 2rem;
`;

const StUser = styled.img`
  width: 5rem;
  height: 5rem;
  display: flex;
  margin-left: auto;
  &:hover {
    color: gray;
  }
`;

const StUsercode = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Bold";
  text-align: center;
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

const StPillHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0rem 0rem 0rem 0rem;
  width: 35rem;
  height: 2rem;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
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

const StPillAddBtn = styled.button`
  font-family: "retendard-Regular";
  font-size: 1.5rem;
  line-height: 1rem;
  color: #006ffd;
  flex: none;
  flex-grow: 0;
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
  margin-bottom: 1rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`;

const ItemTextContainer = styled.div`
  text-align: left;
  margin-left: 6.5rem;
`;

const ItemTitle = styled.div`
  color: black;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
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

export default SeniorMain;
