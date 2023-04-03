import { useState } from "react";
import styled from "styled-components";

interface IProp {
  data: string[];
  setSelected: (v: string) => void;
}

function ExerciseList({ data, setSelected }: IProp) {
  const [clicked, setclicked] = useState("");
  return (
    <StContainer>
      {data.map((item) =>
        clicked != item ? (
          <StExercise
            key={item}
            onClick={() => {
              setclicked(item);
              setSelected(item);
            }}>
            <img src={require("../../assets/images/img_kakao.png")} />
            {item}
          </StExercise>
        ) : (
          <StExerciseClicked
            key={item}
            onClick={() => {
              setclicked("");
              setSelected("");
            }}>
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
  margin-bottom: 5rem;
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
