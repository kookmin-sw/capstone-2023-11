import styled from "styled-components";
import CalChart from "../components/seniorSummary/CalChart";
import BackButton from "../components/common/BackButton";
import NutrientChart from "../components/seniorSummary/NutrientChart";
import ScoreChart from "../components/seniorSummary/ScoreChart";
import { BlueButton } from "../components/common/BlueButton";
import { IUserData } from "../core/atom";
import { setDatas } from "../components/seniorSummary/SetDatas";
import { NutComment } from "../components/seniorSummary/NutComment";
import { CalComment } from "../components/seniorSummary/CalComment";
import ExerciseChart from "../components/seniorSummary/ExerciseChart";

function SeniorSummaryPage() {
  setDatas(dummyData2);
  return (
    <>
      <StHeader>
        <BackButton />
        <HeaderText>주간 보고서</HeaderText>
      </StHeader>
      <STContainer>
        <StTitle>{dummyData2.name}님의 건강 점수는?? 😃</StTitle>
        <ScoreChart />
        <StText>주간 영양소 분석</StText>
        <ChartContainer>
          <NutrientChart />
          <CommentContainer>{NutComment()}</CommentContainer>
        </ChartContainer>
        <StText>주간 칼로리 분석</StText>
        <ChartContainer>
          {CalChart(dummyData2)}
          <CommentContainer>{CalComment(dummyData2)}</CommentContainer>
        </ChartContainer>
        <StText>운동 기록 분석</StText>
        <ChartContainer>
          {ExerciseChart(dummyData2)}
          <CommentContainer>굿</CommentContainer>
        </ChartContainer>
        <StText>🐶 복실이 총평!</StText>
        <ChartContainer>
          <CommentContainer>굿</CommentContainer>
        </ChartContainer>
        <BlueButton>먹은 음식 기록 보기</BlueButton>
      </STContainer>
    </>
  );
}

export default SeniorSummaryPage;

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 0.1rem solid #f8f9fe;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const HeaderText = styled.div`
  font-size: 1.8rem;
  text-align: center;
  font-family: "Pretendard-Regular";
  align-self: center;
  color: #71727a;
  flex: 1 1 0;
`;

const ChartContainer = styled.div`
  padding: 2rem 2rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 2rem;
  margin-bottom: 3rem;
`;

const CommentContainer = styled(ChartContainer)`
  margin-top: 2rem;
  background-color: #ffffff;
  font-size: 1.3rem;
  font-family: "Pretendard-Regular";
  white-space: pre-line;
  letter-spacing: 0.1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  padding: 1rem 2rem;
  text-align: center;
  margin-top: 1rem;
`;

const StText = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Bold";
  padding: 1rem 1rem;
`;

const STContainer = styled.div`
  padding: 3rem 2rem;
  justify-content: center;
  margin: 1rem auto;
`;

const dummyData2: IUserData = {
  name: "홍길동",
  gender: "male",
  age: 25,
  weight: 72,
  height: 178,
  drinkings: 0,
  smoke: 0,
  medicalHistory: [
    {
      kor: "간염",
      eng: "dsadsadas",
      description: "sddfdsgsdff",
    },
  ],
  weeklyFoodNutrientSum: [
    {
      date: "2023-04-27",
      calorie: 2057,
      carbohydrate: 329,
      protein: 85,
      fat: 83,
      cholesterol: 77,
      natrium: 2071,
    },
    {
      date: "2023-04-28",
      calorie: 1673,
      carbohydrate: 268,
      protein: 68,
      fat: 70,
      cholesterol: 54,
      natrium: 1632,
    },
    {
      date: "2023-04-29",
      calorie: 1912,
      carbohydrate: 306,
      protein: 78,
      fat: 100,
      cholesterol: 93,
      natrium: 1864,
    },
    {
      date: "2023-04-30",
      calorie: 1786,
      carbohydrate: 231,
      protein: 73,
      fat: 62,
      cholesterol: 63,
      natrium: 1754,
    },
    {
      date: "2023-05-01",
      calorie: 2098,
      carbohydrate: 336,
      protein: 86,
      fat: 96,
      cholesterol: 60,
      natrium: 2054,
    },
    {
      date: "2023-05-02",
      calorie: 1561,
      carbohydrate: 249,
      protein: 64,
      fat: 87,
      cholesterol: 44,
      natrium: 1524,
    },
    {
      date: "2023-05-03",
      calorie: 2245,
      carbohydrate: 360,
      protein: 92,
      fat: 71,
      cholesterol: 92,
      natrium: 2209,
    },
  ],
  weeklyExerciseInfo: [
    {
      date: "2023-04-27",
      calorie: 266,
      hour: 1,
      count: 1,
    },
    {
      date: "2023-04-28",
      calorie: 415,
      hour: 2,
      count: 1,
    },
    {
      date: "2023-04-29",
      calorie: 187,
      hour: 1,
      count: 1,
    },
    {
      date: "2023-04-30",
      calorie: 670,
      hour: 4,
      count: 1,
    },
    {
      date: "2023-05-01",
      calorie: 458,
      hour: 1,
      count: 1,
    },
    {
      date: "2023-05-02",
      calorie: 312,
      hour: 2,
      count: 1,
    },
    {
      date: "2023-05-03",
      calorie: 349,
      hour: 3,
      count: 1,
    },
  ],
};
