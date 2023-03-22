import styled from "styled-components";

function GuardianJoinPage() {
  return (
    <StGuardianPage>
      <StWelcomMessage>어서오세요 김딸기님</StWelcomMessage>
      <StInfoText>피보호인(부모님)의 유저코드를 확인해주세요!</StInfoText>
      <StContainer>
        <StCodeInfo>👨‍👩‍👧‍👦 복실이를 사용중인 피보호인이 있으신가요?</StCodeInfo>
        <StInputContainer>
          <StInputLabel htmlFor="jb-input-text"> # </StInputLabel>
          <StNormalInput
            id="jb-input-text"
            type="tel"
            placeholder="피보호인의 유저 코드를 입력해주세요"></StNormalInput>
          <StCodeButton>추가</StCodeButton>
        </StInputContainer>
      </StContainer>
    </StGuardianPage>
  );
}
export default GuardianJoinPage;

const StGuardianPage = styled.div`
  display: flex;
  flex-direction: column;
`;
const StWelcomMessage = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 3rem;
  margin-top: 2.5rem;
  margin-left: 2.4rem;
`;
const StInfoText = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  color: #71727a;
  margin-top: 1.2rem;
  margin-left: 2.4rem;
  margin-bottom: 2.4rem;
`;
const StCodeInfo = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  line-height: 3.2rem;
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StNormalInput = styled.input`
  width: 29.5rem;
  height: 4.8rem;
  border: 0.15rem solid;
  border-radius: 1.2rem;
  padding-left: 3rem;
  padding-right: 1.5rem;
  font-size: 1.5rem;
  background-color: white;
  border: 0.15rem solid #006ffd;
  font-family: "Pretendard-Regular";
`;
const StInputContainer = styled.div`
  width: 90%;
  display: flex;
  margin-top: 1.8rem;
`;
const StInputLabel = styled.label`
  position: relative;
  left: 2.5rem;
  font-size: 1.5rem;
  font-family: "Pretendard-Regular";
  margin-top: 1.65rem;
`;
const StCodeButton = styled.button`
  border: none;
  background: #006ffd;
  border-radius: 12px;
  color: white;
  font-size: 1.5rem;
  width: 4.6rem;
  height: 4.8rem;
  position: relative;
  right: 2rem;
  z-index: 2;
`;
