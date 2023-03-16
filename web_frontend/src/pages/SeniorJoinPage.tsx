import styled from "styled-components";

function SeniorJoinPage() {
  return (
    <StSeniorPage>
      <StWelcomMessage>어서오세요 김딸기님</StWelcomMessage>
      <StInfoText>보호자와 함께 회원가입 하는 것을 추천드립니다.</StInfoText>
    </StSeniorPage>
  );
}
export default SeniorJoinPage;

const StSeniorPage = styled.div`
  display: flex;
  flex-direction: column;
`;
const StWelcomMessage = styled.p``;
const StInfoText = styled.p``;
