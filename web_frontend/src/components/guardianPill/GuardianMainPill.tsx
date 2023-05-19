import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPillInfo } from "../../core/api";
import { IPillInfo } from "../../core/atom";
import { motion } from "framer-motion";

function Pill() {
  const [pillData, setPillData] = useState<IPillInfo>();

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
                <StPillItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }} key={index}>
                  <StPillImg src={value.imageUrl} />
                  <StPillContent>{value.name.length > 5 ? value.name.slice(0, 4) + "..." : value.name}</StPillContent>
                  {/* <StDaySwapper>
                    {value.breakfast ? <StPillTake>아침</StPillTake> : null}
                    {value.lunch ? <StPillTake>점심</StPillTake> : null}
                    {value.dinner ? <StPillTake>저녁</StPillTake> : null}
                  </StDaySwapper> */}
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
  height: 13.5rem;
  overflow-x: scroll;
  align-self: stretch;
  background-color: transparent;
  border: 0;
`;

const StPillItem = styled(motion.button)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  width: 11rem;
  height: 13rem;
  background: #eaf2ff;
  flex: none;
  flex-grow: 0;
  background-color: #eaf2ff;
  border: 0;
  border-radius: 1.6rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`;

const StPillImg = styled.img`
  width: 11rem;
  height: 10rem;
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
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.2rem;
  font-family: "Pretendard-Bold";
  background-color: #006ffd;
  color: white;
  border-radius: 1rem;
`;

const StPillContent = styled.div`
  font-family: "Pretendard-Bold";
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

// const StDaySwapper = styled.div`
//   display: flex;
//   gap: 1rem;
//   width: 100%;
//   margin-left: 1rem;
// `;

// const StPillTake = styled.div`
//   width: 5rem;
//   height: 2.5rem;
//   background: #006ffd;
//   border-radius: 0.8rem;
//   font-family: "Pretendard-Bold";
//   font-size: 1.5rem;
//   color: white;
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;
//   margin-top: 1rem;
// `;

export default Pill;
