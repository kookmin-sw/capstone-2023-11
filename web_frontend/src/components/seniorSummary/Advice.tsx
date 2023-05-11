import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export function SeniorAdvice() {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    callOpenAIApi();
  }, []);

  async function callOpenAIApi() {
    console.log("calling api...");

    const APIBody = {
      model: "text-davinci-003",
      prompt: `I am a highly intelligent question answering bot. 
      If you ask me a question that is rooted in truth, 
      I will give you the answer to Korean. 
      If you ask me a question that is nonsense, trickery, or has no clear answer, 
      I will respond with "잘 모르겠어요.".
      Q: 이사람의 이름은 김덕춘이고, 69세, 163cm, 37kg 여성입니다. 
      김덕춘의 지난 7일간 식사 데이터를 알려드리겠습니다. 
      평균 칼로리 섭취량 1600kcal, 평균 단백질 섭취량 30g, 평균 탄수화물 섭취량 200g, 평균 지방 섭취량 12g입니다. 
      지난 7일간 운동을 한 일자는 0일 입니다. 이 사람의 한줄평 및 추천하는 식사의 예, 추천하는 운동을 아래의 예시처럼 보여주세요.
      "김덕춘의 종합평가는 같은 연령대에 비해 ~~합니다.\n ~~와 같은 이유 때문에 ~~와 같은 음식을 추천드립니다.\n ~~와 같은 이유 때문에 ~~와 같은 운동을 추천드립니다." A:`,
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
        setAnswer(response?.data?.choices[0]?.text);
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
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const StLoadingImg = styled.img`
  width: 20%;
  margin-left: 40%;
  margin-bottom: 0.5rem;
`;

const StLoadingText = styled.div`
  text-align: center;
`;
