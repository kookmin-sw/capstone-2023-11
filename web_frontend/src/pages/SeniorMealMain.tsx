import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import SeniorCalendar from "../components/common/SeniorCalendar";
import { useState } from "react";
import moment from "moment";

function SeniorMealMain() {
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  return (
    <StSeniorMealMain>
      <StHeader>
        <BackButton />
        <StTitle>식단 기록</StTitle>
      </StHeader>
      <SeniorCalendar setDate={setSelectedDate} />
      <StDate className="date">{moment(selectedDate).format("YYYY년 MM월 DD일")}</StDate>
      <StFoodContainer></StFoodContainer>
    </StSeniorMealMain>
  );
}

export default SeniorMealMain;

const StSeniorMealMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StTitle = styled.p`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 2.5rem;
`;
const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
`;
const StDate = styled.p`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border-bottom: 0rem solid #ffffff;
`;
const StFoodContainer = styled.div`
  overflow: scroll;
`;
