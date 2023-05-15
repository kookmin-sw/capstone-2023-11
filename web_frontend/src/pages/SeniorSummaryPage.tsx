import styled from "styled-components";
import CalChart from "../components/seniorSummary/CalChart";
import NutrientChart from "../components/seniorSummary/NutrientChart";
import ScoreChart from "../components/seniorSummary/ScoreChart";
import { BlueButton } from "../components/common/BlueButton";
import { NutComment } from "../components/seniorSummary/NutComment";
import { CalComment } from "../components/seniorSummary/CalComment";
import ExerciseChart from "../components/seniorSummary/ExerciseChart";
import { useQuery } from "react-query";
import { getWeeklyData } from "../core/api";
import { useCallback, useEffect, useState } from "react";
import { exampleData, navigateIndex } from "../core/atom";
import { ExerciseComment } from "../components/seniorSummary/ExerciseComment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SeniorAdvice } from "../components/seniorSummary/Advice";
import { useSetRecoilState } from "recoil";

function SeniorSummaryPage() {
  const [firstApi, setFirstApi] = useState(true);
  const { data } = useQuery("weeklyData", () => getWeeklyData(), { enabled: !!firstApi });
  const [example, setExample] = useState(false);
  const setNameAtom = useSetRecoilState(navigateIndex);
  const [isActive, setIsActive] = useState(false);
  const isActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);
  const SCORE_WEIGHT = {
    exercise: 3,
    calorie: 2,
    nutrient: 1,
  };
  const navigate = useNavigate();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
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

  const preBMR = 10 * data?.data.weight + 6.25 * data?.data.height - 5 * data?.data.age;
  const BMR = Math.round(data?.data.gender == "male" ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
  const BMI = data?.data.weight / (data?.data.height / 100) ** 2;
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
  const exerciseCal = [];
  const foodCal = [];
  const fatExample = [116, 89, 89, 79, 147, 85, 98];
  const proExample = [78, 125, 98, 143, 125, 62, 79];
  const carExample = [96, 58, 66, 129, 55, 96, 94];

  for (let i = 0; i < 7; i++) {
    const fat = Math.round((data?.data.weeklyFoodNutrientSum[i].fat / goals.fat) * 100);
    const protein = Math.round((data?.data.weeklyFoodNutrientSum[i].protein / goals.protein) * 100);
    const carbohydrate = Math.round((data?.data.weeklyFoodNutrientSum[i].carbohydrate / goals.carbohydrate) * 100);
    const exerciseData = data?.data.weeklyExerciseInfo[i].calorie;
    const foodData = data?.data.weeklyFoodNutrientSum[i].calorie;
    foodCal.push(foodData);
    exerciseCal.push(exerciseData);
    fatPercent.push(fat);
    proPercent.push(protein);
    carPercent.push(carbohydrate);
  }
  const exerciseDeduction = exerciseCal.filter((num) => num === 0).length;
  const calDeduction = foodCal.filter((num) => num < BMR).length;
  const carDeduction = carPercent.filter((num) => num < 100).length;
  const fatDeduction = fatPercent.filter((num) => num < 100).length;
  const proDeduction = proPercent.filter((num) => num < 100).length;
  const nutDeduction = carDeduction + fatDeduction + proDeduction;
  let score =
    100 -
    exerciseDeduction * SCORE_WEIGHT.exercise -
    calDeduction * SCORE_WEIGHT.calorie -
    nutDeduction * SCORE_WEIGHT.nutrient;
  if (BMI >= 25) {
    score = Math.round(score * (90 / 100));
  } else if (BMI >= 23) {
    score = Math.round(score * (95 / 100));
  } else if (BMI < 18.5) {
    score = Math.round(score * (95 / 100));
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
    setNameAtom(1);
  }, []);
  useEffect(() => {
    if (data) {
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {isActive ? (
        <StHeader>
          <StButtonBack src={require("../assets/images/img_left.png")} onClick={() => navigate(`/senior/main`)} />
          <div>
            <HeaderText2 onClick={isActiveToggle}>주간 보고서</HeaderText2>
            <HeaderText2
              onClick={() => {
                navigate(`/senior/summary/day`);
                isActiveToggle();
              }}>
              일간 보고서
            </HeaderText2>
          </div>
        </StHeader>
      ) : (
        <StHeader>
          <StButtonBack src={require("../assets/images/img_left.png")} onClick={() => navigate(`/senior/main`)} />
          <HeaderText onClick={isActiveToggle}>주간 보고서 ▾</HeaderText>
        </StHeader>
      )}
      <STContainer>
        {example ? (
          <StTitle>
            데이터가 부족하여 <br />
            예시 보고서를 보여드립니다!!😃
          </StTitle>
        ) : (
          <StTitle>{data?.data.name}님의 건강 점수는?? 😃</StTitle>
        )}
        <ScoreChart score={score} />
        <motion.ul className="container" variants={container} initial="hidden" animate="visible">
          <motion.li className="item" variants={items}>
            <StText>주간 영양소 분석</StText>
            <ChartContainer>
              {example
                ? NutrientChart(fatExample, proExample, carExample, dateStrings)
                : NutrientChart(fatPercent, proPercent, carPercent, dateStrings)}{" "}
              <StText className="summary">{example ? "홍길동" : data?.data.name}님의 이번주 영양소는?</StText>
              <CommentContainer>
                {NutComment(example ? "홍길동" : data?.data.name, fatPercent, proPercent, carPercent)}
              </CommentContainer>
            </ChartContainer>
          </motion.li>
          <motion.li className="item" variants={items}>
            <StText>주간 칼로리 분석</StText>
            <ChartContainer>
              {example ? CalChart(exampleData, 2015, dateStrings) : CalChart(data?.data, BMR, dateStrings)}
              <StText className="summary">{example ? "홍길동" : data?.data.name}님의 이번주 칼로리는?</StText>
              <CommentContainer>
                {example ? CalComment(exampleData, 2015) : CalComment(data?.data, BMR)}
              </CommentContainer>
            </ChartContainer>
          </motion.li>
          <motion.li className="item" variants={items}>
            <StText>운동 기록 분석</StText>
            <ChartContainer>
              {example ? ExerciseChart(exampleData, dateStrings) : ExerciseChart(data?.data, dateStrings)}
              <StText className="summary">{example ? "홍길동" : data?.data.name}님의 이번주 운동은?</StText>
              <CommentContainer>
                {example ? ExerciseComment(exampleData) : ExerciseComment(data?.data)}
              </CommentContainer>
            </ChartContainer>
          </motion.li>
          <motion.li className="item" variants={items}>
            <StText>🐶 복실이 총평!</StText>
            {SeniorAdvice(data?.data)}
          </motion.li>
          <div className="row">
            <StBlueBTn
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                navigate(`/senior/summary/day`);
              }}>
              일간 보고서 보기
            </StBlueBTn>
          </div>
        </motion.ul>
      </STContainer>
    </motion.div>
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
  z-index: 9999;
  div {
    display: flex;
    flex-direction: column;
    width: inherit;
  }
`;
const HeaderText = styled.div`
  font-size: 2rem;
  text-align: center;
  font-family: "Pretendard-Regular";
  align-self: center;
  color: #71727a;
  flex: 1 1 0;
  padding-right: 1.7rem;
`;
const HeaderText2 = styled(HeaderText)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-right: 2.5rem;
`;
const ChartContainer = styled.div`
  padding: 2rem 2rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 2rem;
  margin-bottom: 3rem;
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
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
`;
const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;

const StBlueBTn = styled(BlueButton)`
  margin-bottom: 7rem;
`;
