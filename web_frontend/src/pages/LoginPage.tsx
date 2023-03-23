import { useState } from "react";
import styled from "styled-components";
import { GuardianIcn, RadioButton, RadioUnclickedButton, SeniorIcn } from "../assets/icons";
import KakaoLoginButton from "../components/common/KakaoLoginButton";

function LoginPage() {
  const [userStatus, setUserStatus] = useState("senior");
  return (
    <StLoginPage>
      <img src="" />
      <StTitle>사용할 서비스를 선택하세요</StTitle>
      <StSelectContainer>
        {userStatus == "guardian" ? (
          <StClickedButton>
            <StIcon src={RadioButton} />
            <StButtonText>보호자 서비스</StButtonText>
            <StUserIcon src={GuardianIcn} />
          </StClickedButton>
        ) : (
          <StUnclickedButton onClick={() => setUserStatus("guardian")}>
            <StIcon src={RadioUnclickedButton} />
            <StButtonText>보호자 서비스</StButtonText>
            <StUserIcon src={GuardianIcn} />
          </StUnclickedButton>
        )}
        {userStatus == "senior" ? (
          <StClickedButton>
            <StIcon src={RadioButton} />
            <StButtonText>시니어 서비스</StButtonText>
            <StUserIcon src={SeniorIcn} />
          </StClickedButton>
        ) : (
          <StUnclickedButton onClick={() => setUserStatus("senior")}>
            <StIcon src={RadioUnclickedButton} />
            <StButtonText>시니어 서비스</StButtonText>
            <StUserIcon src={SeniorIcn} />
          </StUnclickedButton>
        )}
      </StSelectContainer>
      <KakaoLoginButton />
    </StLoginPage>
  );
}
export default LoginPage;

const StLoginPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StTitle = styled.p`
  font-size: 2.8rem;
  font-family: "Pretendard-Bold";
  margin-bottom: 4.4rem;
`;
const StSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StUnclickedButton = styled.button`
  border: none;
  border-radius: 1.6rem;
  background-color: white;
  width: 32rem;
  height: 5rem;
  display: flex;
  align-items: center;
  color: black;
  border: 0.15rem solid #eaf2ff;
  margin-bottom: 2.3rem;
`;
const StIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 1.6rem;
  margin-right: 1.2rem;
`;
const StButtonText = styled.p`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  width: 19rem;
  margin-right: 2.5rem;
  text-align: left;
`;
const StUserIcon = styled.img`
  width: 4rem;
  height: 4rem;
`;
const StClickedButton = styled.button`
  border: none;
  border-radius: 1.6rem;
  background-color: #eaf2ff;
  width: 32rem;
  height: 5rem;
  display: flex;
  align-items: center;
  margin-bottom: 2.3rem;
`;
