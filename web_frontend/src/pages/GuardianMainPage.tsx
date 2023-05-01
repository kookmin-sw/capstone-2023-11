import styled from "styled-components";

function GuardianMain() {
  return (
    <StContainer>
      <StTitle></StTitle>
    </StContainer>
  );
}

export default GuardianMain;

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0rem;
  align-self: center;
  padding-bottom: 1rem;
`;
