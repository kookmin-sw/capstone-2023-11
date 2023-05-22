import styled from "styled-components";

function Loading() {
  return (
    <StLoadingContainer>
      <StLoadingText>잠시만 기다려주세요.</StLoadingText>
      <StLoadingImg src={require("../../assets/images/spinner.gif")} />
    </StLoadingContainer>
  );
}

export default Loading;

const StLoadingImg = styled.img`
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

const StLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StLoadingText = styled.div`
  text-align: center;
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  margin-top: 3rem;
`;
