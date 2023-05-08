import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPillInfo } from "../../core/api";

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
      <StPillList>
        {pillData?.medicines.map((value, index) => {
          return (
            <>
              <StLink to={`/senior/pill/detail/${value.id}`}>
                <StPillItem key={index}>
                  <StPillImg src={value.imageUrl} />
                  <StPillContent>{value.name.length > 12 ? value.name.slice(0, 12) + "..." : value.name}</StPillContent>
                  <StDaySwapper>
                    {value.breakfast ? <StPillTake>아침</StPillTake> : null}
                    {value.lunch ? <StPillTake>점심</StPillTake> : null}
                    {value.dinner ? <StPillTake>저녁</StPillTake> : null}
                  </StDaySwapper>
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
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
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
  width: 8rem;
  height: 2.7rem;
  line-height: 2.7rem;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  background-color: #006ffd;
  color: white;
  border-radius: 1rem;
`;

const StPillContent = styled.div`
  font-family: "retendard-Bold";
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

const StDaySwapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-left: 1rem;
`;

const StPillTake = styled.div`
  width: 4rem;
  height: 2.5rem;
  background: #006ffd;
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.6rem;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
`;

export default Pill;
