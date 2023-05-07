import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import SeniorCalendar from "../components/common/SeniorCalendar";
import { useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { getRecordMeal } from "../core/api";
import { useNavigate } from "react-router-dom";

function SeniorMealMain() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const { data } = useQuery("mealData", getRecordMeal);
  return (
    <StSeniorMealMain>
      <StHeader>
        <BackButton />
        <StTitle>식단 기록</StTitle>
      </StHeader>
      <SeniorCalendar setDate={setSelectedDate} />
      <StDate className="date">{moment(selectedDate).format("YYYY년 MM월 DD일")}</StDate>
      <StFoodContainer>
        {data?.data?.mealInfos
          .filter((mealCon: any) => mealCon.dateTime.includes(selectedDate))
          .map((mealCon: any) => {
            return mealCon?.detail.map((meal: any, index: number) => {
              if (index % 2 == 0) {
                return (
                  <StFoodBox1>
                    <img src={mealCon.imageUrl}></img>
                    <div>
                      <StFoodName>{meal.name}</StFoodName>
                      <StNutrient>
                        탄수화물: {meal.carbohyborateTotal}g, 지방:{meal.fatTotal}g
                      </StNutrient>
                    </div>
                    <StKcal>{meal.calorie} Kcal</StKcal>
                  </StFoodBox1>
                );
              } else {
                return (
                  <StFoodBox2>
                    <img src={mealCon.imageUrl}></img>
                    <div>
                      <StFoodName>{meal.name}</StFoodName>
                      <StNutrient>
                        탄수화물: {Math.round(meal.carbohyborateTotal)}g, 지방:{Math.ceil(meal.fatTotal)}g
                      </StNutrient>
                    </div>
                    <StKcal>{Math.round(meal.calorie)} Kcal</StKcal>
                  </StFoodBox2>
                );
              }
            });
          })}
      </StFoodContainer>
      <StCheckButton onClick={() => navigate("/senior/meal/add")}>추가하기</StCheckButton>
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
  max-height: 30rem;
  margin-top: 1.6rem;
`;
const StFoodBox1 = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  height: 6rem;
  background: #eaf2ff;
  border-radius: 1.6rem;
  padding: 1.5rem;
  img {
    width: 4rem;
    height: 3.5rem;
    border-radius: 1rem;
  }
  div {
    width: 18rem;
    margin-left: 1rem;
  }
  margin-bottom: 1.5rem;
`;
const StFoodBox2 = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  height: 6rem;
  background: #ffffff;
  border: 0.3rem solid #eaf2ff;
  border-radius: 1.6rem;
  padding: 1.5rem;
  img {
    width: 4rem;
    height: 3.5rem;
    border-radius: 1rem;
  }
  div {
    width: 18rem;
    margin-left: 1rem;
  }
  margin-bottom: 1.5rem;
`;
const StKcal = styled.p`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  margin-left: 1.2rem;
  white-space: nowrap;
`;
const StFoodName = styled.p`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
`;
const StNutrient = styled.p`
  color: #006ffd;
  font-size: 1.2rem;
  margin-top: 0.4rem;
  font-family: "Pretendard-Bold";
`;
const StCheckButton = styled.button`
  width: 32.7rem;
  height: 4.8rem;
  background-color: #006ffd;
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  position: relative;
  bottom: 0rem;
  margin-bottom: 1rem;
`;
