import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { getSeniorInfo } from "../core/api";
import NoPill from "../components/seniorPill/SeniorMainNoPill";
import Pill from "../components/seniorPill/SeniorMainPill";
import { Helmet } from "react-helmet-async";
import {
  birthdayAtom,
  drinkingsAtom,
  genderAtom,
  heightAtom,
  illAtom,
  MainInfo,
  nameAtom,
  navigateIndex,
  smokeAtom,
  weightAtom,
} from "../core/atom";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";

interface IBTN {
  open: boolean;
}
function SeniorMain() {
  const [info, setInfo] = useState<MainInfo>();
  const [open, setOpen] = useState(false);
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
  useEffect(() => {
    setNavigateAtom(0);
    async function fetchData() {
      const data = await getSeniorInfo();
      setInfo(data);
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
  const onToggle = () => setOpen(!open);
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
        <title>복실이에 오신 것을 환영합니다</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/senior/main" />
      </Helmet>
      <STContainer>
        <StHeader>
          <StUserContent
            onClick={() => {
              navigate(`/senior/myPage`);
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
                  <StLink to={`/senior/pill`}>
                    <StPillAddBtn>자세히 보기</StPillAddBtn>
                  </StLink>
                </StPillHeader>
                {info?.medicineInfoList?.length ?? 0 >= 1 ? <Pill /> : <NoPill />}
              </StMainItem>
            </motion.ul>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StItemHeader>🍽 ⛳️ 식사 및 운동</StItemHeader>
                {/* <WhiteButton2
                  onClick={() => {
                    navigate(`/senior/meal`);
                  }}>
                  <IconImg src={require(`../assets/icons/icon_meal.png`)} style={{ backgroundColor: "#feecdc" }} />
                  오늘, {info?.todayMealCount}번의 식사를 기록했습니다!
                </WhiteButton2>
                <WhiteButton2
                  onClick={() => {
                    navigate(`/senior/exercise`);
                  }}>
                  <IconImg src={require(`../assets/icons/icon_exercise.png`)} style={{ backgroundColor: "#87dd79" }} />
                  오늘, {info?.todayWorkOutCount}번의 운동을 기록했습니다!
                </WhiteButton2> */}
                <ItemComment2>오늘 {info?.userName}님이 입력하신 기록입니다.</ItemComment2>
                <StCountSwapper>
                  <StCount
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      navigate(`/senior/meal`);
                    }}>
                    식사
                    <div className="line" />
                    <StCountText>{info?.todayMealCount ? info?.todayMealCount : 0} 번</StCountText>
                  </StCount>
                  <StCount
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      navigate(`/senior/exercise`);
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
                <StItemHeader>💯 내 건강 점수는 몇점?</StItemHeader>
                <ItemContent
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    navigate(`/senior/summary`);
                  }}>
                  <ItemImgWrapper>
                    <ItemImg src={require(`../assets/icons/icon_score.png`)} />
                  </ItemImgWrapper>
                  <ItemTextContainer>
                    <ItemTitle>주간 보고서 확인</ItemTitle>
                    <ItemComment>일주일동안의 건강 리포트 보러가기</ItemComment>
                  </ItemTextContainer>
                </ItemContent>
              </StMainItem>
            </motion.ul>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StItemHeader>🗓 나의 건강 일지</StItemHeader>
                <StLastContainer
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    navigate(`/senior/summary/day`);
                  }}>
                  <ItemImgWrapper>
                    <ItemImg src={require(`../assets/icons/icon_calendar.png`)} />
                  </ItemImgWrapper>
                  <ItemTextContainer>
                    <ItemTitle>일간 보고서 확인</ItemTitle>
                    <ItemComment>오늘 입력한 {info?.userName ? info?.userName : "xx"}님의 기록 보러가기</ItemComment>
                  </ItemTextContainer>
                </StLastContainer>
              </StMainItem>
            </motion.ul>
          </MenuList>
        </motion.ul>
        {open ? (
          <InsertFormPositioner>
            <motion.ul className="container" variants={items} initial="hidden" animate="visible">
              <BtnContainer
                onClick={() => {
                  navigate(`/senior/meal/add`);
                }}>
                <IconImg src={require(`../assets/icons/icon_meal.png`)} style={{ backgroundColor: "#f8f9fe" }} />
                <StText>식사 입력</StText>
              </BtnContainer>
              <BtnContainer
                onClick={() => {
                  navigate(`/senior/exercise/add`);
                }}>
                <IconImg src={require(`../assets/icons/icon_exercise.png`)} style={{ backgroundColor: "#f8f9fe" }} />
                <StText>운동 입력</StText>
              </BtnContainer>
            </motion.ul>
          </InsertFormPositioner>
        ) : (
          <></>
        )}
        <CircleButton onClick={onToggle} open={open}>
          +
        </CircleButton>
      </STContainer>
    </motion.div>
  );
}

export default SeniorMain;

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
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  margin-left: 2rem;
  /* margin-bottom: 0.5rem; */
`;

const ItemComment = styled.div`
  color: #71727a;
  font-family: "Pretendard-Regular";
  font-size: 1.3rem;
  margin-left: 2rem;
  margin-top: 0.5rem;
`;
const ItemComment2 = styled.div`
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

const CircleButton = styled.div`
  background: #6abaff;
  font-family: "Pretendard-Regular";
  z-index: 5;
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  position: fixed;
  padding-bottom: 1rem;
  left: 90%;
  bottom: 10rem;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props: IBTN) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const StText = styled.div`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  padding: 1.5rem;
`;
const InsertFormPositioner = styled.div`
  padding: 2rem;
  width: 25rem;
  height: 17rem;
  bottom: 13rem;
  margin-right: 2rem;
  right: 1%;
  position: absolute;
  display: block;
  position: fixed;
  background-color: #f8f9fe;
  border-radius: 2rem;
`;

const BtnContainer = styled(WhiteButton2)`
  margin-bottom: 1rem;
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
