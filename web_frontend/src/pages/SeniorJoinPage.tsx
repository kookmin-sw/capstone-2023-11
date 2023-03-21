import styled from "styled-components";
import { useState } from "react";

function SeniorJoinPage() {
  const [process, setProcess] = useState(1);
  const [height, setHeight] = useState<number | string>(0);
  const [weight, setWeight] = useState<number | string>(0);
  const [birth, setBirth] = useState<string>();
  const [drinkings, setDrinkings] = useState<number>(0);
  const [smoke, setSmoke] = useState<number>(0);
  const [ills, setIlls] = useState<string[]>([]);
  const body = { height: height, weight: weight, birth: birth, drinkings: drinkings, smoke: smoke };
  console.log(body);
  if (process == 1) {
    return (
      <StSeniorPage>
        <StWelcomMessage>어서오세요 김딸기님</StWelcomMessage>
        <StInfoText>보호자와 함께 회원가입 하는 것을 추천드립니다.</StInfoText>
        <StMedicalContainer>
          <StHeight>
            <StInfoInput>키</StInfoInput>
            <StMedicalInput type="number" onChange={(e) => setHeight(e.target.value)} placeholder="cm 단위" />
          </StHeight>
          <StWeight>
            <StInfoInput>몸무게</StInfoInput>
            <StMedicalInput type="number" onChange={(e) => setWeight(e.target.value)} placeholder="kg 단위" />
          </StWeight>
        </StMedicalContainer>
        <StMedicalContainer>
          <div>
            <StInfoInput>💊 생년월일을 알려주세요!</StInfoInput>
            <StNormalInput onChange={(e) => setBirth(e.target.value)} type="date" />
          </div>
        </StMedicalContainer>
        <StMedicalContainer>
          <div>
            <StInfoInput>🍻 음주 주기</StInfoInput>
            <StAnswerContainer>
              {drinkings == 0 ? (
                <StButtonClicked>없음</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setDrinkings(0)}>없음</StButtonUnClicked>
              )}
              {drinkings == 1 ? (
                <StButtonClicked>주 1회</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setDrinkings(1)}>주 1회</StButtonUnClicked>
              )}
              {drinkings == 2 ? (
                <StButtonClicked>주 2~4회</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setDrinkings(2)}>주 2~4회</StButtonUnClicked>
              )}
              {drinkings == 3 ? (
                <StButtonClicked>주 5회이상</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setDrinkings(3)}>주 5회이상</StButtonUnClicked>
              )}
            </StAnswerContainer>
          </div>
        </StMedicalContainer>
        <StMedicalContainer>
          <div>
            <StInfoInput>🚬 흡연 주기</StInfoInput>
            <StAnswerContainer>
              {smoke == 0 ? (
                <StButtonClicked>없음</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setSmoke(0)}>없음</StButtonUnClicked>
              )}
              {smoke == 1 ? (
                <StButtonClicked>하루 3개비</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setSmoke(1)}>하루 3개비</StButtonUnClicked>
              )}
              {smoke == 2 ? (
                <StButtonClicked>하루 반갑</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setSmoke(2)}>하루 반갑</StButtonUnClicked>
              )}
              {smoke == 3 ? (
                <StButtonClicked>하루 한갑</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setSmoke(3)}>하루 한갑</StButtonUnClicked>
              )}
              {smoke == 4 ? (
                <StButtonClicked>하루 한갑 반 이상</StButtonClicked>
              ) : (
                <StButtonUnClicked onClick={() => setSmoke(4)}>하루 한갑 반 이상</StButtonUnClicked>
              )}
            </StAnswerContainer>
          </div>
        </StMedicalContainer>
        <StButtonContainer>
          <StJoinButton onClick={() => setProcess(2)}>다음으로</StJoinButton>
        </StButtonContainer>
      </StSeniorPage>
    );
  } else {
    return (
      <StSeniorPage>
        <StWelcomMessage>어서오세요 김딸기님</StWelcomMessage>
        <StInfoText>보호자와 함께 회원가입 하는 것을 추천드립니다.</StInfoText>
        <StIllInfo>
          💊 혹시 따로 앓고 있는 질병이 있으신가요?
          <p /> 해당하는 질병에 모두 체크해주세요!
        </StIllInfo>
        <div>
          {ills.includes("고혈압") ? (
            <StButtonClicked
              onClick={(e) => setIlls(ills.filter((ill) => ill !== (e.target as HTMLLIElement).innerHTML))}>
              고혈압
            </StButtonClicked>
          ) : (
            <StButtonUnClicked onClick={(e) => setIlls([...ills, (e.target as HTMLLIElement).innerHTML])}>
              고혈압
            </StButtonUnClicked>
          )}
        </div>
      </StSeniorPage>
    );
  }
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
  font-size: 1.8rem;
  font-family: "Pretendard-Bold";
  margin-top: 2.7rem;
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
  padding-right: 1.5rem;
  font-size: 1.5rem;
`;
const StJoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32.7rem;
  height: 4.8rem;
  color: white;
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  background-color: #006ffd;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
`;

const StAnswerContainer = styled.div`
  width: 100%;
`;
const StButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;
const StButtonUnClicked = styled.button`
  height: 3rem;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  background: #eaf2ff;
  border-radius: 1.2rem;
  border: none;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  color: #006ffd;
  margin-right: 1rem;
  margin-top: 1.5rem;
`;
const StButtonClicked = styled.button`
  height: 3rem;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  color: #eaf2ff;
  border-radius: 1.2rem;
  border: none;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  background: #006ffd;
  margin-right: 1rem;
  margin-top: 1.5rem;
`;
const StIllInfo = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  line-height: 3.2rem;
  margin-left: 2.4rem;
`;
