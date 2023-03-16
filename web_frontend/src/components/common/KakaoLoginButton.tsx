import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function KakaoLoginButton() {
  const navigate = useNavigate();
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=localhost:3000/auth/kakao&response_type=code`;

  return (
    <StKakaoLoginButton onClick={() => navigate(KAKAO_AUTH_URL)}>
      <StKakaoLogo />
      <StLoginText>카카오 계정으로 시작하기</StLoginText>
    </StKakaoLoginButton>
  );
}

const StKakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 28.2rem;
  height: 4.8rem;
  border-radius: 10rem;
  background-color: #fee500;
  box-shadow: 0 0.2rem 1.3rem rgba(0, 0, 0, 0.05);
`;

const StKakaoLogo = styled.img`
  margin-left: 4.2rem;
  margin-right: 0.8rem;
`;
const StLoginText = styled.p`
  font-family: "Pretendard-Bold";
  color: black;
`;
export default KakaoLoginButton;
