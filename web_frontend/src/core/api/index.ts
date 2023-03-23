import axios from "axios";
import { DOMAIN } from "../../constants/domain";

export const getKakaoAccessToken = async (authorization: string) => {
  const data = axios.post(
    `https://kauth.kakao.com/oauth/token`,
    {},
    {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAOKEY,
        redirect_uri: `${DOMAIN}/auth/kakao`,
        code: authorization,
      },
    },
  );

  return data;
};
export const getUserStatus = async (userStatus: string | null, accessToken: string | undefined) => {
  const data = axios.post(
    `${process.env.REACT_APP_SERVER}/api/login/token-check`,
    {
      token: accessToken,
      userType: userStatus,
    },
    {},
  );

  return data;
};
