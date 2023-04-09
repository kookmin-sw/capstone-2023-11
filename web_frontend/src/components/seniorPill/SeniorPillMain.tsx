import styled from "styled-components";
import { Link } from "react-router-dom";
import PillAddModal from "./PillAddModal";
import { useEffect, useState } from "react";
import { getPillInfo } from "../../core/api";

function SeniorPillMain() {
  const [pillData, setPillData] = useState<pillInfo>();

  useEffect(() => {
    async function fetchData() {
      const data = await getPillInfo();
      setPillData(data);
    }

    fetchData();
  }, []);
  return (
    <>
      <StHeader>
        <StLink to={`/senior/main`}>
          <StBackBtn>
            <StBackBtnImg src={require("../../assets/images/img_left.png")} />
          </StBackBtn>
        </StLink>
        <StTitle>복용하는 약 목록</StTitle>
      </StHeader>
      <StBody>
        <PillAddModal />
        <StPillList>
          {pillData?.medicines.map((value, index) => (
            <>
              <StLink to={"/senior/pill/detail"}>
                <StItem key={index}>
                  <StItemImgBox>
                    <StItemImg src={value.imageUrl} />
                  </StItemImgBox>
                  <StItemContent>
                    <StItemName>{value.name}</StItemName>
                    <StItemRemainingDays>남은 복용 일자: {value.remainDay}</StItemRemainingDays>
                    <StDaySwapper>
                      {value.breakfast ? <StPillTake>아침</StPillTake> : <StPillNoTake>아침</StPillNoTake>}
                      {value.lunch ? <StPillTake>점심</StPillTake> : <StPillNoTake>점심</StPillNoTake>}
                      {value.dinner ? <StPillTake>저녁</StPillTake> : <StPillNoTake>아침</StPillNoTake>}
                    </StDaySwapper>
                  </StItemContent>
                </StItem>
              </StLink>
            </>
          ))}
        </StPillList>
      </StBody>
    </>
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

const StHeader = styled.header`
  padding: 5rem 2rem 0 2rem;
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
  padding: 2rem;
  font-family: "Pretendard-Regular";
`;

const StPillList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 2rem;
  padding: 2rem;
  border-radius: 1rem;
`;

const StItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const StItemImgBox = styled.div`
  width: 30%;
  height: 8rem;
  margin-right: 2rem;
`;

const StItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const StItemContent = styled.div`
  width: 70%;
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
  margin: 1rem;
  gap: 1rem;
`;

const StPillNoTake = styled.div`
  width: 6rem;
  height: 3.5rem;
  background: #eaf2ff;
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  color: #006ffd;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const StPillTake = styled.div`
  width: 6rem;
  height: 3.5rem;
  background: #006ffd;
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default SeniorPillMain;
