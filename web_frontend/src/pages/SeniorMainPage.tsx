import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { getSeniorInfo } from "../core/api";
import NoPill from "../components/seniorPill/SeniorMainNoPill";
import Pill from "../components/seniorPill/SeniorMainPill";
import { MainInfo } from "../core/atom";
import { motion } from "framer-motion";

interface IBTN {
  open: boolean;
}
function SeniorMain() {
  const [info, setInfo] = useState<MainInfo>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const data = await getSeniorInfo();
      setInfo(data);
    }
    fetchData();
  }, []);
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
      <STContainer>
        <StHeader>
          <StUserContent
            onClick={() => {
              navigate(`/senior/myPage`);
            }}>
            <StUser src={require("../assets/images/img_avatar.png")}></StUser>
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
                <StItemHeader>💯 내 건강 점수는 몇점?</StItemHeader>
                <ItemContent
                  onClick={() => {
                    navigate(`/senior/summary`);
                  }}>
                  <ItemImgWrapper>
                    <ItemImg src={require(`../assets/icons/icon_score.png`)} />
                  </ItemImgWrapper>
                  <ItemTextContainer>
                    <ItemTitle>건강 분석하러 가기</ItemTitle>
                    <ItemComment>
                      지난 7일동안 기록한 {info?.userName}님의 <br /> 건강 리포트를 확인해보세요
                    </ItemComment>
                  </ItemTextContainer>
                </ItemContent>
              </StMainItem>
            </motion.ul>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StItemHeader>🗓 나의 건강 일지</StItemHeader>
                <ItemContent
                  onClick={() => {
                    navigate(`/senior/summary/day`);
                  }}>
                  <ItemImgWrapper>
                    <ItemImg src={require(`../assets/icons/icon_calendar.png`)} />
                  </ItemImgWrapper>
                  <ItemTextContainer>
                    <ItemTitle>나의 건강 기록 보러가기</ItemTitle>
                    <ItemComment>
                      이번달에 {info?.userName ? info?.userName : "xx"}님은 <br />
                      {info?.monthRecordCount ? info?.monthRecordCount : "0"}개의 기록을 남기셨습니다.
                    </ItemComment>
                  </ItemTextContainer>
                </ItemContent>
              </StMainItem>
            </motion.ul>
            <motion.ul className="container" variants={items}>
              <StMainItem>
                <StItemHeader>🍽 ⛳️ 식단 운동</StItemHeader>
                <WhiteButton2
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
                </WhiteButton2>
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
  font-family: "retendard-Bold";
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
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
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
  bottom: 5rem;
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
  bottom: 8rem;
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
