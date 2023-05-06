import styled from "styled-components";
import CalChart from "../components/seniorSummary/CalChart";
import BackButton from "../components/common/BackButton";
import NutrientChart from "../components/seniorSummary/NutrientChart";
import ScoreChart from "../components/seniorSummary/ScoreChart";
import { BlueButton } from "../components/common/BlueButton";
import { NutComment } from "../components/seniorSummary/NutComment";
import { CalComment } from "../components/seniorSummary/CalComment";
import ExerciseChart from "../components/seniorSummary/ExerciseChart";
import { useQuery } from "react-query";
import { getWeeklyData } from "../core/api";
import { useEffect, useState } from "react";
import { exampleData } from "../core/atom";
import { ExerciseComment } from "../components/seniorSummary/ExerciseComment";

function SeniorSummaryPage() {
  const [firstApi, setFirstApi] = useState(true);
  const { data } = useQuery("weeklyData", () => getWeeklyData(), { enabled: !!firstApi });
  const [example, setExample] = useState(false);

  const preBMR = 10 * data?.data.weight + 6.25 * data?.data.height - 5 * data?.data.age;
  const BMR = Math.round(data?.data.gender == "male" ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
  const goals = {
    protein: data?.data.weight * 0.8,
    carbohydrate: (BMR * 0.55) / 4,
    fat: (BMR * 0.25) / 9,
    cholesterol: 200,
    sodium: 2000,
  };
  const fatPercent = [];
  const proPercent = [];
  const carPercent = [];
  const fatExample = [116, 89, 89, 79, 147, 85, 98];
  const proExample = [78, 125, 98, 143, 125, 62, 79];
  const carExample = [96, 58, 66, 129, 55, 96, 94];

  for (let i = 0; i < 7; i++) {
    const fat = Math.round((data?.data.weeklyFoodNutrientSum[i].fat / goals.fat) * 100);
    const protein = Math.round((data?.data.weeklyFoodNutrientSum[i].protein / goals.protein) * 100);
    const carbohydrate = Math.round((data?.data.weeklyFoodNutrientSum[i].carbohydrate / goals.carbohydrate) * 100);
    fatPercent.push(fat);
    proPercent.push(protein);
    carPercent.push(carbohydrate);
  }
  const dateStrings = [];
  for (let i = 7; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${month}/${day}`;
    dateStrings.push(dateString);
  }
  useEffect(() => {
    if (data) {
      console.log(data);
      setFirstApi(false);
      if (
        data.data.weeklyFoodNutrientSum.reduce(
          (total: number, currentValue: { calorie: number }) => (total = total + currentValue.calorie),
          0,
        ) == 0
      ) {
        setExample(true);
      }
    }
  }, [data]);
  return (
    <>
      <StHeader>
        <BackButton />
        <HeaderText>주간 보고서</HeaderText>
      </StHeader>
      <STContainer>
        <StTitle>{example ? "예시" : data?.data.name}님의 건강 점수는?? 😃</StTitle>
        <ScoreChart />
        <StText>주간 영양소 분석</StText>
        <ChartContainer>
          {example
            ? NutrientChart(fatExample, proExample, carExample, dateStrings)
            : NutrientChart(fatPercent, proPercent, carPercent, dateStrings)}{" "}
          <StText className="summary">{data?.data.name}님의 이번주 영양소는?</StText>
          <CommentContainer>{NutComment(data?.data.name, fatPercent, proPercent, carPercent)}</CommentContainer>
        </ChartContainer>
        <StText>주간 칼로리 분석</StText>
        <ChartContainer>
          {example ? CalChart(exampleData, 2015, dateStrings) : CalChart(data?.data, BMR, dateStrings)}
          <StText className="summary">{data?.data.name}님의 이번주 칼로리는?</StText>
          <CommentContainer>{example ? CalComment(exampleData, 2015) : CalComment(data?.data, BMR)}</CommentContainer>
        </ChartContainer>
        <StText>운동 기록 분석</StText>
        <ChartContainer>
          {example ? ExerciseChart(exampleData, dateStrings) : ExerciseChart(data?.data, dateStrings)}
          <StText className="summary">{data?.data.name}님의 이번주 운동은?</StText>
          <CommentContainer>{example ? ExerciseComment(exampleData) : ExerciseComment(data?.data)}</CommentContainer>
        </ChartContainer>
        <StText>🐶 복실이 총평!</StText>
        <ChartContainer>
          <CommentContainer>굿</CommentContainer>
        </ChartContainer>
        <BlueButton>일간 보고서 보기</BlueButton>
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
  .summary {
    /* text-align: center; */
  }
`;

const CommentContainer = styled(ChartContainer)`
  margin-top: 0.5rem;
  background-color: #ffffff;
  font-size: 1.3rem;
  font-family: "Pretendard-Regular";
  white-space: pre-line;
  letter-spacing: 0.1rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
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
