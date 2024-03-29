import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { adviceAtom, IWeeklyData } from "../../core/atom";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export function SeniorAdvice(prop: IWeeklyData) {
  const [firstAPI, setFirstAPI] = useState(false);
  const exerCalories = [];
  const foodCalories = [];
  const amountProtein = [];
  const amountFat = [];
  const amountCarbohy = [];
  const [answer, setAnswer] = useState("");
  const getAdviceAtom = useRecoilValue(adviceAtom);
  const setAdviceAtom = useSetRecoilState(adviceAtom);

  if (prop) {
    for (let i = 0; i < 7; i++) {
      const calData = prop.weeklyExerciseInfo[i].calorie;
      const calories = Math.round(prop.weeklyFoodNutrientSum[i].calorie);
      const fat = Math.round(prop.weeklyFoodNutrientSum[i].fat);
      const carbohyrate = Math.round(prop.weeklyFoodNutrientSum[i].carbohydrate);
      const protein = Math.round(prop.weeklyFoodNutrientSum[i].protein);

      foodCalories.push(calories);
      exerCalories.push(calData);
      amountFat.push(fat);
      amountCarbohy.push(carbohyrate);
      amountProtein.push(protein);
    }
  }
  const countExercise = exerCalories.filter((num) => num !== 0).length;
  const ate = foodCalories.filter((num) => num !== 0).length;
  const totalCal = foodCalories.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const totalFat = amountFat.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const totalProtein = amountProtein.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const totalCarbohy = amountCarbohy.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);

  useEffect(() => {
    if (prop && firstAPI == false) {
      setFirstAPI(true);
      if (getAdviceAtom == "") {
        callOpenAIApi();
      } else {
        setAnswer(getAdviceAtom);
      }
    }
  }, [[prop]]);

  async function callOpenAIApi() {
    const APIBody = {
      model: "text-davinci-003",
      prompt: `I am a highly intelligent question answering bot. 
      If you ask me a question that is rooted in truth, 
      I will give you the answer to Korean. 
      If you ask me a question that is nonsense, trickery, or has no clear answer, 
      I will respond with "잘 모르겠어요.".
      Q: 이사람의 이름은 ${prop.name}님이고, ${prop.age}세, ${prop.height}cm, ${prop.weight}kg ${
        prop.gender == "MALE" ? "남성" : "여성"
      }입니다. 
      ${prop.name}님은 7일간 식사데이터를 알려드리겠습니다. 일일 평균 칼로리 섭취량 ${Math.round(totalCal / ate)},
      평균 지방 섭취량 ${Math.round(totalFat / ate)}, 평균 단백질 섭취량 ${Math.round(
        totalProtein / ate,
      )}, 평균 탄수화물 섭취량 ${Math.round(totalCarbohy / ate)}입니다.
      ${prop.name}님은 7일간 총 ${countExercise}일 운동했습니다.
      ${prop.name}님에 대한 평가와 추천하는 음식, 추천하는 운동에 대한 조언을 5문장 이상으로 말해줘" A:`,
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    await axios
      .post("https://api.openai.com/v1/completions", APIBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      })
      .then((response) => {
        const text = response?.data?.choices[0]?.text;
        const modifyText = text.replace(/\./g, ".\n");
        setAnswer(modifyText);
        setAdviceAtom(response?.data?.choices[0]?.text);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <ChartContainer>
      <CommentContainer>
        {answer ? (
          answer
        ) : (
          <>
            <StLoadingText>잠시만 기다려주세요.</StLoadingText>
            <StLoadingImg src={require("../../assets/images/spinner.gif")} />
            <StLoadingText>복실이가 총평을 작성하고 있습니다.</StLoadingText>
          </>
        )}
      </CommentContainer>
    </ChartContainer>
  );
}

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
  line-height: 2rem;
  margin-bottom: 0.5rem;
`;

const StLoadingImg = styled.img`
  width: 20%;
  margin-left: 40%;
  margin-bottom: 0.5rem;
`;

const StLoadingText = styled.div`
  text-align: center;
  font-family: "Pretendard-Regular";
`;
