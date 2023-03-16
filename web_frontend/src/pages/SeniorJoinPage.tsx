import styled from "styled-components";

function SeniorJoinPage() {
  return (
    <StSeniorPage>
      <StWelcomMessage>어서오세요 김딸기님</StWelcomMessage>
      <StInfoText>보호자와 함께 회원가입 하는 것을 추천드립니다.</StInfoText>
      <StMedicalContainer>
        <StHeight>
          <StInfoInput>키</StInfoInput>
          <StMedicalInput placeholder="cm 단위" />
        </StHeight>
        <StWeight>
          <StInfoInput>몸무게</StInfoInput>
          <StMedicalInput placeholder="kg 단위" />
        </StWeight>
      </StMedicalContainer>
      <StMedicalContainer>
        <div>
          <StInfoInput>💊 혹시 앓고 계신 지병이 있으신가요?</StInfoInput>
          <StNormalInput placeholder="고혈압, 당뇨등" />
        </div>
      </StMedicalContainer>
      <StMedicalContainer>
        <div>
          <StInfoInput>🔬 혹시 혈압을 알고 계신가요?</StInfoInput>
          <StNormalInput placeholder="모른다면 비워주세요" />
        </div>
      </StMedicalContainer>
      <StButtonContainer>
        <StJoinButton>가입하기</StJoinButton>
      </StButtonContainer>
    </StSeniorPage>
  );
}
export default SeniorJoinPage;

const StSeniorPage = styled.div`
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
const StMedicalContainer = styled.div`
  display: flex;
  margin-left: 2.5rem;
`;
const StHeight = styled.div`
  display: flex;
  flex-direction: column;
`;

const StWeight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2.5rem;
`;

const StInfoInput = styled.p`
  font-size: 1.5rem;
  font-family: "Pretendard-Bold";
  margin-top: 2.4rem;
  padding-left: 0.5rem;
`;
const StMedicalInput = styled.input`
  width: 13.5rem;
  height: 4.8rem;
  margin-top: 1rem;
  border: 0.15rem solid;
  border-radius: 1.2rem;
  padding-left: 1.5rem;
`;
const StNormalInput = styled.input`
  width: 29.5rem;
  height: 4.8rem;
  margin-top: 1rem;
  border: 0.15rem solid;
  border-radius: 1.2rem;
  padding-left: 1.5rem;
`;
const StJoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32.7rem;
  height: 4.8rem;
  color: white;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  background-color: #006ffd;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
`;
const StButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;
