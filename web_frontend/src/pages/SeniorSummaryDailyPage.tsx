import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { FoodIcn } from "../assets/icons";
import BackButton from "../components/common/BackButton";
import { getDailyData } from "../core/api";

// interface IData {
//   meal: IMeal[];
//   exercise: IExercise[];
// }
interface IMeal {
  id: number;
  createdAt: string;
  times: number;
  imageUrl: string;
  detail: IMealDetail[];
}
interface IMealDetail {
  name: string;
  calorie: number;
  carbohyborateTotal: number;
  protein: number;
  fatTotal: number;
}
interface IExercise {
  id: number;
  type: string;
  kcal: number;
  createdAt: string;
  kor: string;
  eng: string;
  hour: number;
}

function SeniorSummaryDailyPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [firstApi, setFirstApi] = useState(true);
  const { data } = useQuery("dailyData", () => getDailyData(), { enabled: !!firstApi });
  const [mealData, setMealData] = useState<IMeal[]>([]);
  const [exerciseData, setExerciseData] = useState<IExercise[]>([]);
  const [mealLength, setMealLength] = useState(0);
  const [mealState, setMealState] = useState(0);

  useEffect(() => {
    console.log(data?.data);
    setFirstApi(false);
  }, [data]);

  useEffect(() => {
    if (data) {
      console.log("mealData:", mealData);
      console.log("exerciseData:", exerciseData);
      console.log(mealLength);
    }
  }, [mealData, exerciseData]);

  useEffect(() => {
    if (data) {
      setMealData(data.data.meal);
      setExerciseData(data.data.exercise);
      setMealLength(data.data.meal.length);
    }
  }, [data]);

  return (
    <>
      <StHeader>
        <BackButton />
        <HeaderText>일간 요약</HeaderText>
      </StHeader>
      <STContainer>
        <StTitle className="indent">
          {year + "년 " + month + "월 " + date + "일 " + week[now.getDay()] + "요일"}
        </StTitle>
        <StText>음식 입력</StText>
        {mealLength != 0 ? (
          <StRowContainer>
            {mealState != 0 ? (
              <div
                className="buttonContainer"
                onClick={() => {
                  setMealState((now) => now - 1);
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
                    <StMealImage src={item.imageUrl} />
                    {item.detail.map((mealList) => (
                      <StFoodBox>
                        <StIcon src={FoodIcn} />
                        <div>
                          <StFoodName>{mealList.name}</StFoodName>
                          <StNutrient>
                            탄수화물: {Math.round(mealList.carbohyborateTotal * 10) / 10}g 단백질:{" "}
                            {Math.round(mealList.protein * 10) / 10}g
                          </StNutrient>
                        </div>
                        <StKcal>
                          {Math.round(mealList.calorie)}
                          kcal
                        </StKcal>
                      </StFoodBox>
                    ))}
                  </div>
                ) : (
                  <></>
                ),
              )}
            </DataContainer>
            {mealState != mealLength - 1 ? (
              <div
                className="buttonContainer"
                onClick={() => {
                  setMealState((now) => now + 1);
                }}>
                <StButton src={require("../assets/icons/icon_next.png")} />
              </div>
            ) : (
              <StButton src={require("../assets/icons/icon_nonext.png")} />
            )}
          </StRowContainer>
        ) : (
          <DataContainer>
            <StText>😭 오늘 입력한 데이터가 없습니다</StText>
          </DataContainer>
        )}
        <StText>운동 입력</StText>
        {data?.data.exercise.length != 0 ? (
          <DataContainer></DataContainer>
        ) : (
          <DataContainer>
            <StText>😭 오늘 입력한 데이터가 없습니다</StText>
          </DataContainer>
        )}
      </STContainer>
    </>
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
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  padding: 1rem 2rem;
  text-align: center;
  margin-top: 1rem;
`;

const DataContainer = styled.div`
  padding: 2rem 2rem;
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
  .name {
    font-size: 1.7rem;
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
  div {
    width: 18rem;
    margin-left: 1rem;
  }
  margin-bottom: 1.5rem;
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
