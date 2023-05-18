import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSeniorTotalWatched } from "../core/api";
import NoPill from "../components/seniorPill/SeniorMainNoPill";
import Pill from "../components/seniorPill/SeniorMainPill";
import {
  birthdayAtom,
  drinkingsAtom,
  genderAtom,
  heightAtom,
  illAtom,
  nameAtom,
  navigateIndex,
  smokeAtom,
  weightAtom,
} from "../core/atom";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { Helmet } from "react-helmet-async";

function GuardianTotal() {
  const [info, setInfo] = useState<any>();
  const setNavigateAtom = useSetRecoilState(navigateIndex);
  const setNameAtom = useSetRecoilState(nameAtom);
  const setHeightAtom = useSetRecoilState(heightAtom);
  const setWeightAtom = useSetRecoilState(weightAtom);
  const setBirthdayAtom = useSetRecoilState(birthdayAtom);
  const setDrinkingsAtom = useSetRecoilState(drinkingsAtom);
  const setSmokeAtom = useSetRecoilState(smokeAtom);
  const setIllAtom = useSetRecoilState(illAtom);
  const setGenderAtom = useSetRecoilState(genderAtom);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    setNavigateAtom(0);
    async function fetchData() {
      const data = await getSeniorTotalWatched(String(params?.id));

      setInfo(data.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (info) {
      setNameAtom(info.userName);
      setHeightAtom(info.height);
      setWeightAtom(info.weight);
      setBirthdayAtom(info.birthday);
      setDrinkingsAtom(info.drinkings);
      setSmokeAtom(info.smoke);
      setIllAtom(info.ills);
      setGenderAtom(info.gender);
    }
  }, [info]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };
  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>복실이</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/guardian/:id/main" />
      </Helmet>
      <STContainer>
        <StHeader>
          <StUserContent
            onClick={() => {
              navigate(`/guardian/main`);
            }}>
            <StUser
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              src={require("../assets/images/img_avatar.png")}></StUser>
            <StUsercode>{info?.userName ? info?.userName : "xxx"}</StUsercode>
          </StUserContent>
        </StHeader>
        <motion.ul className="container" variants={container} initial="hidden" animate="visible">
          <MenuList>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StPillHeader>
                  <StItemHeader>💊 복용하는 약</StItemHeader>
                  <StLink to={`/guardian/${String(params?.id)}/pill`}>
                    <StPillAddBtn>자세히 보기</StPillAddBtn>
                  </StLink>
                </StPillHeader>
                {info?.medicineInfoList?.length ?? 0 >= 1 ? <Pill /> : <NoPill />}
              </StMainItem>
            </motion.ul>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StItemHeader>🍽 ⛳️ 식사 및 운동</StItemHeader>

                <ItemComment>오늘 {info?.userName}님이 입력하신 기록입니다.</ItemComment>
                <StCountSwapper>
                  <StCount
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      navigate(`/guardian/${String(params?.id)}/meal`);
                    }}>
                    식사
                    <div className="line" />
                    <StCountText>{info?.todayMealCount ? info?.todayMealCount : 0} 번</StCountText>
                  </StCount>
                  <StCount
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      navigate(`/guardian/${String(params?.id)}/exercise`);
                    }}>
                    운동
                    <div className="line" />
                    <StCountText>{info?.todayWorkOutCount ? info?.todayWorkOutCount : 0} 번</StCountText>
                  </StCount>
                </StCountSwapper>
              </StMainItem>
            </motion.ul>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StItemHeader>💯 시니어의 건강 점수는 몇점?</StItemHeader>
                <ItemContent
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    navigate(`/guardian/${String(params?.id)}/summary`);
                  }}>
                  <ItemImgWrapper>
                    <ItemImg src={require(`../assets/icons/icon_score.png`)} />
                  </ItemImgWrapper>
                  <ItemTextContainer>
                    <ItemTitle>건강 분석하러 가기</ItemTitle>
                    <ItemComment>
                      지난 일주일간 기록된 {info?.userName}님의 <br /> 건강 리포트를 확인해보세요
                    </ItemComment>
                  </ItemTextContainer>
                </ItemContent>
              </StMainItem>
            </motion.ul>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StItemHeader>🗓 시니어의 건강 일지</StItemHeader>
                <StLastContainer
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    navigate(`/guardian/${String(params?.id)}/summary/day`);
                  }}>
                  <ItemImgWrapper>
                    <ItemImg src={require(`../assets/icons/icon_calendar.png`)} />
                  </ItemImgWrapper>
                  <ItemTextContainer>
                    <ItemTitle>보호자의 건강 기록 보러가기</ItemTitle>
                    <ItemComment>
                      이번달에 {info?.userName ? info?.userName : "xx"}님은 <br />
                      {info?.monthRecordCount ? info?.monthRecordCount : "0"}개의 기록을 남기셨습니다.
                    </ItemComment>
                  </ItemTextContainer>
                </StLastContainer>
              </StMainItem>
            </motion.ul>
          </MenuList>
        </motion.ul>
      </STContainer>
    </motion.div>
  );
}

export default GuardianTotal;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
`;

const STContainer = styled.div`
  padding: 0.5rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 1rem;
`;

const StHeader = styled.header`
  margin-top: 1.3rem;
  font-size: 2rem;
  display: flex;
  width: 100%;
  padding: 0rem 2rem 0 2rem;
`;

const StUser = styled(motion.img)`
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
  font-family: "retendard-Bold";
  font-size: 1.3rem;
  line-height: 1rem;
  height: 1.5rem;
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
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`;

const ItemImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

const ItemContent = styled(motion.button)`
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

const StCountSwapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Pretendard-Bold";
  width: 100%;
`;

const StCount = styled(motion.div)`
  font-size: 2.5rem;
  width: 14rem;
  height: 10rem;
  margin: 1rem;
  padding-top: 1rem;
  border-radius: 1.2rem;
  text-align: center;
  line-height: 3rem;
  color: #006ffd;
  background-color: #eaf2ff;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  .line {
    border-bottom: 0.2rem solid #d4d6dd;
    padding: 0.5rem;
    margin: 0rem 1rem;
  }
`;

const StCountText = styled.div`
  font-size: 2rem;
  padding-top: 1rem;
  color: black;
`;

const StLastContainer = styled(ItemContent)`
  margin-bottom: 5rem;
`;
