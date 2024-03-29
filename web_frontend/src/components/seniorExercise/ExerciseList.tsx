import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface IProp {
  selectedData: string[];
  setSelected: (v: string) => void;
  getData: GetData[];
}
interface GetData {
  eng: string;
  kor: string;
  type: string;
  kcalPerHour: number;
  description: string;
}

function ExerciseList({ selectedData, setSelected, getData }: IProp) {
  const [clicked, setclicked] = useState("");
  return (
    <StContainer>
      {selectedData.map((item, index) =>
        clicked != item ? (
          <StExercise
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            key={index}
            onClick={() => {
              setclicked(item);
              setSelected(item);
            }}>
            <img
              src={require(`../../assets/images/exerciseImg/img_${getData.find((data) => data.kor === item)?.eng}.png`)}
            />
            {item}
          </StExercise>
        ) : (
          <StExerciseClicked
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            key={index}
            onClick={() => {
              setclicked("");
              setSelected("");
            }}>
            <img
              src={require(`../../assets/images/exerciseImg/img_${getData.find((data) => data.kor === item)?.eng}.png`)}
            />
            {item}
          </StExerciseClicked>
        ),
      )}
    </StContainer>
  );
}

export default ExerciseList;

const StContainer = styled.div`
  padding: 2rem 2rem;
  justify-content: center;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 15rem;
`;

const StExercise = styled(motion.div)`
  background-color: #f8f9fe;
  margin: 1rem;
  height: auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Pretendard-Regular";
  font-size: 1.8rem;
  padding-bottom: 0.5rem;
  width: 13rem;
  img {
    padding: 1rem;
    width: 10rem;
    height: 10rem;
  }
`;

const StExerciseClicked = styled(StExercise)`
  background-color: #b4dbff;
`;
