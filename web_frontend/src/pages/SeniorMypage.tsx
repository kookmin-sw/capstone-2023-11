import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SeniorMypage() {
  const navigate = useNavigate();
  return (
    <StSeniorMypage>
      <StIntroText>안녕하세요 김딸기님.</StIntroText>
      <StInfoContainer>
        <StProfilePhoto src={require("../assets/images/img_avatar.png")} />
        <StName>김딸기</StName>
        <StUserCode>#7732</StUserCode>
      </StInfoContainer>

      <StButtonContainer>
        <StButtonInfo>개인정보 변경하기</StButtonInfo>
        <StButtonIcon src={require("../assets/images/img_right.png")} />
      </StButtonContainer>
      <StButtonContainer>
        <StButtonInfo>등록되어 있는 보호자</StButtonInfo>
        <StButtonIcon src={require("../assets/images/img_right.png")} />
      </StButtonContainer>
      <StButtonContainer>
        <StButtonInfo>연결된 카메라 확인하기</StButtonInfo>
        <StButtonIcon src={require("../assets/images/img_right.png")} />
      </StButtonContainer>
      <StLogContainer>
        <StLogoutButton onClick={() => navigate(-1)}>로그아웃</StLogoutButton>
      </StLogContainer>
    </StSeniorMypage>
  );
}

export default SeniorMypage;

const StSeniorMypage = styled.div`
  display: flex;
  flex-direction: column;
`;
const StIntroText = styled.span`
  font-family: "Pretendard-Bold";
  font-size: 3.2rem;
  margin-top: 3.5rem;
  margin-left: 2.2rem;
  letter-spacing: -0.05rem;
`;
const StInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5.7rem;
  margin-bottom: 3.3rem;
`;

const StProfilePhoto = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1rem;
`;

const StName = styled.span`
  font-family: "Pretendard-Bold";
  font-size: 1.6rem;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
`;

const StUserCode = styled.span`
  font-family: "Pretendard-Regular";
  color: #71727a;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2.3rem;
  margin-right: 2.3rem;
`;

const StButtonInfo = styled.span`
  font-size: 1.4rem;
  font-family: "Pretendard-Regular";
  padding: 1.6rem;
`;

const StButtonIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 1.7rem;
  margin-right: 1.6rem;
`;
const StLogContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StLogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.6rem;
  height: 4rem;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  color: #006ffd;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
  background-color: white;
  margin-top: 9rem;
`;
