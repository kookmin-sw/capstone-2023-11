import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FoodIcn } from "../assets/icons";
import { BlueButton } from "../components/common/BlueButton";
import { getDailyData } from "../core/api";
import Modal from "react-modal";
import { IExercise, IMeal } from "../core/atom";
import FoodDetailPopUp from "../components/seniorSummary/FoodDetailPopUp";
import { motion } from "framer-motion";

function formatTime(timeString: string) {
  const date = moment(`2000-01-01 ${timeString}`);
  return date.format("HH시 mm분");
}

function SeniorSummaryDailyPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const korNum = ["첫", "두", "세", "네", "다섯"];
  const [firstApi, setFirstApi] = useState(true);
  const { data } = useQuery("dailyData", () => getDailyData(), { enabled: !!firstApi });
  const [mealData, setMealData] = useState<IMeal[]>([]);
  const [exerciseData, setExerciseData] = useState<IExercise[]>([]);
  const [mealLength, setMealLength] = useState(0);
  const [exerciseLength, setExerciseLength] = useState(0);
  const [mealState, setMealState] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedMeal, setClickedMeal] = useState(0);
  const [clickedFood, setClickedFood] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setFirstApi(false);
  }, [data]);

  useEffect(() => {
    if (data) {
      setMealData(data.data.meal);
      setExerciseData(data.data.exercise);
      setMealLength(data.data.meal.length);
      setExerciseLength(data.data.exercise.length);
      setMealState(data.data.meal.length - 1);
    }
  }, [data]);

  function foodClicked(index: number, index2: number) {
    setIsOpen(true);
    setClickedMeal(index);
    setClickedFood(index2);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StHeader>
        <StButton src={require("../assets/images/img_left.png")} onClick={() => navigate(`/senior/main`)} />
        <HeaderText>일간 보고서</HeaderText>
      </StHeader>
      <STContainer>
        <StTitle className="indent">
          {year + "년 " + month + "월 " + date + "일 " + week[now.getDay()] + "요일"}
        </StTitle>
        <StText>오늘 먹은 음식</StText>
        {mealLength != 0 ? (
          <StRowContainer>
            {mealState != mealLength - 1 ? (
              <div
                className="buttonContainer"
                onClick={() => {
                  setMealState((now) => now + 1);
                }}>
                <StButton src={require("../assets/icons/icon_before.png")} />
              </div>
            ) : (
              <StButton src={require("../assets/icons/icon_nobefore.png")} />
            )}
            <DataContainer>
              {mealData?.map((item: IMeal, index) =>
                index == mealState ? (
                  <div className="col">
                    <StText>
                      {formatTime(item.createdAt)}에 {korNum[item.times - 1]}번째로 이 음식을 드셨습니다!
                    </StText>
                    <StMealImage src={item.imageUrl} />
                    {item.detail.map((mealList, index2) => (
                      <StFoodBox id={mealList.name} onClick={() => foodClicked(index, index2)}>
                        <StIcon src={FoodIcn} />
                        <div>
                          <StFoodName>{mealList.name}</StFoodName>
                          <StNutrient>
                            탄수화물: {Math.round(mealList.carbohyborateTotal * 10) / 10}g 단백질:{" "}
                            {Math.round(mealList.protein * 10) / 10}g
                          </StNutrient>
                        </div>
                        <StKcal>{Math.round(mealList.calorie)} kcal</StKcal>
                      </StFoodBox>
                    ))}
                  </div>
                ) : (
                  <></>
                ),
              )}
            </DataContainer>
            {mealState != 0 ? (
              <div
                className="buttonContainer"
                onClick={() => {
                  setMealState((now) => now - 1);
                }}>
                <StButton src={require("../assets/icons/icon_next.png")} />
              </div>
            ) : (
              <StButton src={require("../assets/icons/icon_nonext.png")} />
            )}
          </StRowContainer>
        ) : (
          <DataContainer>
            <div className="col">
              <img className="foodIcon" src={require("../assets/icons/icon_food.png")} />
              <StText>😭 오늘 입력한 음식 데이터가 없습니다 😭</StText>
              <StText>식사를 찍고 입력해주세요!</StText>
            </div>
          </DataContainer>
        )}
        <StText>오늘 한 운동</StText>
        {exerciseLength != 0 ? (
          <DataContainer>
            {exerciseData?.map((item: IExercise) => (
              <div className="col2">
                <StText>{month + "월 " + date + "일 " + formatTime(item.createdAt)}</StText>
                <StExerciseBox id={item.type}>
                  <StIcon className="exerciseIcon" src={require(`../assets/images/exerciseImg/img_${item.eng}.png`)} />
                  <div>
                    <StExerciseName>{item.kor}</StExerciseName>
                    <StHour>{item.hour}시간 하셨어요 !</StHour>
                  </div>
                  <StKcal>{item.kcal} kcal</StKcal>
                </StExerciseBox>
              </div>
            ))}
          </DataContainer>
        ) : (
          <DataContainer>
            <div className="col">
              <StText>😭 오늘 입력한 운동 데이터가 없습니다 😭</StText>
              <StText>운동을 입력해주세요!</StText>
            </div>
          </DataContainer>
        )}
        <div className="row">
          <BlueButton
            onClick={() => {
              navigate(`/senior/summary`);
            }}>
            주간 보고서 보기
          </BlueButton>
        </div>
        <div className="row">
          <StModal isOpen={isOpen}>
            <FoodDetailPopUp
              clickedMeal={clickedMeal}
              clickedFood={clickedFood}
              data={mealData}
              setIsOpen={setIsOpen}
            />
          </StModal>
        </div>
      </STContainer>
    </motion.div>
  );
}

export default SeniorSummaryDailyPage;

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
`;
const HeaderText = styled.div`
  font-size: 1.8rem;
  text-align: center;
  font-family: "Pretendard-Regular";
  align-self: center;
  color: #71727a;
  flex: 1 1 0;
`;
const STContainer = styled.div`
  padding: 3rem 1rem;
  justify-content: center;
  margin: 1rem auto;
  .indent {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
`;
const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  padding: 1rem 2rem;
  text-align: center;
  margin-top: 1rem;
`;
const DataContainer = styled.div`
  padding: 1rem 1rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 2rem;
  margin-bottom: 3rem;
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .col2 {
    display: flex;
    flex-direction: column;
  }
  .name {
    font-size: 1.7rem;
  }
  .exerciseIcon {
    width: 5rem;
    height: 5rem;
  }
  .foodIcon {
    width: 18rem;
    height: 18rem;
  }
`;
const StText = styled.div`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  padding: 1rem 1rem;
`;
const StFoodBox = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  height: 6rem;
  background: #eaf2ff;
  border-radius: 1.6rem;
  padding: 1.5rem;
  justify-content: space-between;
  div {
    width: 17rem;
    margin-left: 1rem;
  }
  margin-bottom: 1.5rem;
`;
const StExerciseBox = styled(StFoodBox)`
  height: 8rem;
  width: 33rem;
  margin-left: 0.3rem;
  div {
    width: 13rem;
    margin-left: 1rem;
  }
`;
const StFoodName = styled.p`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
`;
const StExerciseName = styled(StFoodName)`
  font-size: 1.7rem;
`;
const StNutrient = styled.p`
  color: #006ffd;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  font-family: "Pretendard-Bold";
`;
const StHour = styled(StNutrient)`
  margin-top: 1rem;
`;
const StKcal = styled(StFoodName)`
  margin-left: 1.2rem;
`;
const StMealImage = styled.img`
  padding: 1rem;
  min-width: 25rem;
  min-height: 17rem;
  max-width: 30rem;
  max-height: 20rem;
  margin-bottom: 2rem;
`;
const StIcon = styled.img`
  width: 3rem;
  height: 3rem;
`;
const StRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  .buttonContainer {
    height: 10rem;
    display: flex;
    align-items: center;
  }
`;
const StButton = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;

const StModal = styled(Modal)`
  padding: 5rem;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;
