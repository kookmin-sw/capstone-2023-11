import styled from "styled-components";
import { Link } from "react-router-dom";
import PillAddModal from "../components/seniorPill/PillAddModal";
import { useEffect, useState } from "react";
import { getPillInfo } from "../core/api/index";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

function GuardianPillMainViewPage() {
  const [pillData, setPillData] = useState<pillInfo>();

  useEffect(() => {
    async function fetchData() {
      const data = await getPillInfo();
      setPillData(data);
    }

    fetchData();
  }, []);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
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
      <motion.ul className="container" variants={container} initial="hidden" animate="visible">
        <StContainer>
          <StHeader>
            <StLink to={`/senior/main`}>
              <StBackBtn>
                <StBackBtnImg src={require("../assets/images/img_left.png")} />
              </StBackBtn>
            </StLink>
            <StTitle>복용하는 약 목록</StTitle>
          </StHeader>
          <StBody>
            <StPillList>
              {pillData?.medicines.map((value, index) => (
                <motion.li className="item" variants={items}>
                  <StItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={index}>
                    <StLink to={`/senior/pill/detail/${value.id}`}>
                      <StItemImgBox>
                        <StItemImg src={value.imageUrl} />
                      </StItemImgBox>
                      <StItemContent>
                        <StItemName>
                          {value.name.length >= 15 ? value.name.slice(0, 15) + "..." : value.name}
                        </StItemName>
                        <StItemRemainingDays>남은 복용 일자: {value.remainDay}</StItemRemainingDays>
                        <StDaySwapper>
                          {value.breakfast ? <StPillTake>아침</StPillTake> : <StPillNoTake>아침</StPillNoTake>}
                          {value.lunch ? <StPillTake>점심</StPillTake> : <StPillNoTake>점심</StPillNoTake>}
                          {value.dinner ? <StPillTake>저녁</StPillTake> : <StPillNoTake>저녁</StPillNoTake>}
                        </StDaySwapper>
                      </StItemContent>
                    </StLink>
                  </StItem>
                </motion.li>
              ))}
            </StPillList>
            <StBtnContainer className="item" variants={items}>
              <PillAddModal />
            </StBtnContainer>
          </StBody>
        </StContainer>
      </motion.ul>
    </motion.div>
  );
}

interface pillInfo {
  medicines: [
    {
      createdAt: string;
      modifiedAt: string;
      id: number;
      name: string;
      companyName: string;
      effect: string;
      useMethod: string;
      caution: string;
      depositMethod: string;
      imageUrl: string;
      dueAt: string;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      remainDay: number;
      userWard: {
        createdAt: string;
        modifiedAt: string;
        userId: number;
        kakaoAccountId: number;
        name: string;
        birthday: string;
        gender: string;
        weight: number;
        height: number;
        drinkings: number;
        smoke: number;
      };
    },
  ];
}
export default GuardianPillMainViewPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
  margin: 1rem;
`;

const StBackBtnImg = styled.img`
  width: 2rem;
  height: 2rem;
  padding: 0;
`;

const StTitle = styled.h1`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 2.5rem;
`;

const StBody = styled.div`
  font-size: 2rem;
  padding: 2rem;
  font-family: "Pretendard-Regular";
`;

const StPillList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  border-radius: 1rem;
`;

const StItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #f8f9fe;
  border-radius: 1.6rem;
  padding: 1.4rem 2.4rem;
`;

const StItemImgBox = styled.div`
  width: 30%;
  height: 7rem;
  margin-right: 2rem;
`;

const StItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const StItemContent = styled.div`
  width: 55%;
`;

const StItemName = styled.p`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-family: "Pretendard-Bold";
`;

const StItemRemainingDays = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-family: "Pretendard-Regular";
`;

const StDaySwapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StPillNoTake = styled.div`
  width: 6rem;
  height: 2.7rem;
  background: #eaf2ff;
  border-radius: 0.8rem;
  font-family: "Pretendard-Bold";
  font-size: 1.5rem;
  color: #006ffd;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.4rem;
`;

const StPillTake = styled.div`
  width: 6rem;
  height: 2.7rem;
  background: #006ffd;
  border-radius: 0.8rem;
  font-family: "Pretendard-Bold";
  font-size: 1.5rem;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.4rem;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
`;

const StBtnContainer = styled(motion.li)`
  display: flex;
  justify-content: center;
`;
