import styled from "styled-components";
import { KakaoLogin } from "../../assets/icons";
import { DOMAIN } from "../../constants/domain";
function KakaoLoginButton() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAOKEY}&redirect_uri=${DOMAIN}/auth/kakao&response_type=code`;

  return (
    <StKakaoLoginButton href={KAKAO_AUTH_URL}>
      <StKakaoLogo src={KakaoLogin} />
      <StLoginText>카카오 계정으로 시작하기</StLoginText>
    </StKakaoLoginButton>
  );
}

const StKakaoLoginButton = styled.a`
  display: flex;
  align-items: center;
  width: 28.2rem;
  height: 4.8rem;
  border-radius: 10rem;
  background-color: #fee500;
  box-shadow: 0 0.2rem 1.3rem rgba(0, 0, 0, 0.05);
  border: none;
  text-decoration: none;
`;

const StKakaoLogo = styled.img`
  margin-left: 4.5rem;
  margin-right: 0.8rem;
  width: 1.8rem;
  height: 1.8rem;
`;
const StLoginText = styled.p`
  font-family: "Pretendard-Bold";
  color: black;
  font-size: 1.6rem;
`;
export default KakaoLoginButton;
