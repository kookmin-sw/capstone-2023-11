import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPillInfo } from "../core/api";

function Pill() {
  const [pillData, setPillData] = useState<pillInfo>();

  useEffect(() => {
    async function fetchData() {
      const data = await getPillInfo();
      setPillData(data);
    }

    fetchData();
  }, []);
  return (
    <StPill>
      <StPillHeader>
        <StPillTitle>💊 복용하는 약</StPillTitle>
        <StLink to={`/senior/pill`}>
          <StPillAddBtn>자세히 보기</StPillAddBtn>
        </StLink>
      </StPillHeader>
      <StPillList>
        {pillData?.medicines.map((value, index) => {
          return (
            <>
              <StLink to={`/senior/pill/detail/${value.id}`}>
                <StPillItem key={index}>
                  <StPillImg src={value.imageUrl} />
                  <StPillContent>{value.name.length > 12 ? value.name.slice(0, 12) + "..." : value.name}</StPillContent>
                  <StPillContent>{value.remainDay}</StPillContent>
                  <StPillRemainday>{value.remainDay}일 남음</StPillRemainday>
                </StPillItem>
              </StLink>
            </>
          );
        })}
      </StPillList>
    </StPill>
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

const StPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
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

const StPillTitle = styled.h1`
  font-family: "Pretendard-Bold";
  font-weight: 800;
  font-size: 2rem;
  line-height: 2rem;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StPillAddBtn = styled.button`
  font-family: "retendard-Regular";
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 0rem;
  color: #006ffd;
  flex: none;
  flex-grow: 0;
  border: 0;
  background-color: transparent;
`;

const StPillList = styled.div`
  font-family: "Pretendard-Bold";
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  width: 100%;
  height: 20rem;
  overflow-x: scroll;
  align-self: stretch;
  background-color: transparent;
  border: 0;
`;

const StPillItem = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  width: 20rem;
  height: 18rem;
  background: #eaf2ff;
  flex: none;
  flex-grow: 0;
  background-color: #eaf2ff;
  border: 0;
  border-radius: 1.6rem;
`;

const StPillImg = styled.img`
  width: 20rem;
  height: 12rem;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  border-radius: 2rem;
  border: transparent;
  padding: 0.5rem;
`;

const StPillRemainday = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 10rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  background-color: #2897ff;
  color: white;
  border-radius: 0.5rem;
`;

const StPillContent = styled.div`
  font-family: "retendard-Bold";
  font-weight: 600;
  font-size: 1.6rem;
  padding: 0.5rem 1rem 0rem 1rem;
  width: 20rem;
  height: 2rem;
  color: #000000;
  text-align: left;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
`;

export default Pill;
