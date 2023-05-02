import styled from "styled-components";
import BackButton from "../components/common/BackButton";

interface IData {
  meal: IMeal[];
  exercise: IExercise[];
}
interface IMeal {
  id: number;
  dateTime: string;
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
  console.log(dummyData);

  return (
    <>
      <StHeader>
        <BackButton />
        <HeaderText>일간 보고서</HeaderText>
      </StHeader>
      <STContainer>
        <StTitle className="indent">
          {year + "년 " + month + "월 " + date + "일 " + week[now.getDay()] + "요일"}
        </StTitle>
        <StText>음식 입력</StText>
        <ChartContainer>
          <div className="row">
            <button>{`<`}</button>
            <div className="col">
              <img src={require("../assets/images/img_kakao.png")} />
              <StText className="name">음식 이름</StText>
              <StText>음식 칼로리</StText>
              <StText>입력 시간</StText>
            </div>
            <button>{`>`}</button>
          </div>
        </ChartContainer>
        <StText>운동 입력</StText>
        <ChartContainer></ChartContainer>
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
  padding: 3rem 2rem;
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

const ChartContainer = styled.div`
  padding: 2rem 2rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 2rem;
  margin-bottom: 3rem;
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  .col {
    display: flex;
    flex-direction: column;
  }
  .name {
    font-size: 1.7rem;
  }
  & img {
    padding: 1rem;
    min-width: 25rem;
    min-height: 10rem;
  }
  & button {
    border: none;
    background-color: #f8f9fe;
  }
`;

const StText = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Bold";
  padding: 1rem 1rem;
`;

const dummyData: IData = {
  meal: [
    {
      id: 7,
      dateTime: "2023-05-02T05:12:02.54917",
      times: 3,
      imageUrl: "https://boksiri-bucket.s3.ap-northeast-2.amazonaws.com/meal_00000007_20230502051202.jpg",
      detail: [
        {
          name: "string",
          calorie: 0.0,
          carbohyborateTotal: 0.0,
          protein: 0.0,
          fatTotal: 0.0,
        },
        {
          name: "string",
          calorie: 0.0,
          carbohyborateTotal: 0.0,
          protein: 0.0,
          fatTotal: 0.0,
        },
      ],
    },
    {
      id: 6,
      dateTime: "2023-05-02T05:12:01.571587",
      times: 2,
      imageUrl: "https://boksiri-bucket.s3.ap-northeast-2.amazonaws.com/meal_00000007_20230502051201.jpg",
      detail: [
        {
          name: "string",
          calorie: 0.0,
          carbohyborateTotal: 0.0,
          protein: 0.0,
          fatTotal: 0.0,
        },
        {
          name: "string",
          calorie: 0.0,
          carbohyborateTotal: 0.0,
          protein: 0.0,
          fatTotal: 0.0,
        },
      ],
    },
    {
      id: 5,
      dateTime: "2023-05-02T05:11:40.462414",
      times: 1,
      imageUrl: "https://boksiri-bucket.s3.ap-northeast-2.amazonaws.com/meal_00000007_20230502051140.jpg",
      detail: [
        {
          name: "string",
          calorie: 0.0,
          carbohyborateTotal: 0.0,
          protein: 0.0,
          fatTotal: 0.0,
        },
        {
          name: "string",
          calorie: 0.0,
          carbohyborateTotal: 0.0,
          protein: 0.0,
          fatTotal: 0.0,
        },
      ],
    },
  ],
  exercise: [
    {
      id: 3,
      type: "WALKING",
      kcal: 900,
      createdAt: "2023-04-06",
      kor: "걷기",
      eng: "walking",
      hour: 0,
    },
    {
      id: 2,
      type: "WALKING",
      kcal: 300,
      createdAt: "2023-04-06",
      kor: "걷기",
      eng: "walking",
      hour: 0,
    },
    {
      id: 1,
      type: "WALKING",
      kcal: 0,
      createdAt: "2023-04-06",
      kor: "걷기",
      eng: "walking",
      hour: 0,
    },
  ],
};
