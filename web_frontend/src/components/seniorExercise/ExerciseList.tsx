import { useState } from "react";
import styled from "styled-components";

function ExerciseList() {
  const [clicked, setclicked] = useState("");
  const items = [
    "걷기",
    "달리기",
    "게이트볼",
    "배드민턴",
    "수영",
    "등산",
    "골프",
    "야구",
    "축구",
    "농구",
    "당구",
    "볼링",
    "헬스",
    "낚시",
    "럭비",
    "서핑",
  ];
  return (
    <StContainer>
      {items.map((item) =>
        clicked != item ? (
          <StExercise key={item} onClick={() => setclicked(item)}>
            <img src={require("../../assets/images/img_kakao.png")} />
            {item}
          </StExercise>
        ) : (
          <StExerciseClicked key={item} onClick={() => setclicked(item)}>
            <img src={require("../../assets/images/img_kakao.png")} />
            {item}
          </StExerciseClicked>
        ),
      )}
    </StContainer>
  );
}

export default ExerciseList;

const StContainer = styled.div`
  padding: 3rem 2rem;
  justify-content: center;
  margin: 1rem auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const StExercise = styled.div`
  background-color: #f8f9fe;
  margin: 1rem;
  height: auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 1.8rem;
  padding-bottom: 0.5rem;
  img {
    padding: 1rem;
  }
`;

const StExerciseClicked = styled(StExercise)`
  background-color: #b4dbff;
`;
