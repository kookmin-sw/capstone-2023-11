import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import { BlueButton } from "../components/common/BlueButton";
import ExerciseList from "../components/seniorExercise/ExerciseList";

function SeniorExercise() {
  return (
    <StContainer>
      <StHeader>
        <BackButton></BackButton>
        <StTitle>운동 추가</StTitle>
        <StCenterContainer>
          <StInput placeholder="운동을 입력해주세요" />
        </StCenterContainer>
      </StHeader>
      <ExerciseList />
      <STButtonContainer>
        <BlueButton>운동 선택</BlueButton>
      </STButtonContainer>
    </StContainer>
  );
}

export default SeniorExercise;

const StInput = styled.input`
  background: white;
  border-radius: 1rem;
  border-color: #0066ff;
  color: rgba(0, 0, 0, 0.8);
  height: 4rem;
  width: 90%;
  letter-spacing: 0.3rem;
  text-indent: 1rem;
  font-family: "Pretendard-Regular";
  margin-bottom: 2rem;
  align-self: center;
`;

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;
`;

const StHeader = styled.div`
  display: block;
  border-bottom: 0.1rem solid #000000;
  position: sticky;
  top: 0rem;
  background-color: white;
`;

const StCenterContainer = styled.div`
  text-align: center;
`;

const STButtonContainer = styled.div`
  background-color: white;
  position: sticky;
  bottom: 0rem;
  padding-top: 1rem;
  padding-bottom: 3rem;
`;
