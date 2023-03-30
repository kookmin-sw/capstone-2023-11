import styled from "styled-components";
import BackButton from "../components/common/BackButton";

function SeniorExercise() {
  return (
    <StContainer>
      <StHeader>
        <BackButton></BackButton>
        <StTitle>운동 추가</StTitle>
        <StInput placeholder="운동을 입력해주세요" />
      </StHeader>
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
  width: 100%;
  letter-spacing: 0.3rem;
  text-indent: 1rem;
  font-family: "Pretendard-Regular";
  margin-bottom: 2rem;
`;

const StContainer = styled.div`
  padding: 3rem 2rem;
  justify-content: center;
  margin: 1rem auto;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const StHeader = styled.div`
  display: block;
  border-bottom: 0.1rem solid #000000;
`;
