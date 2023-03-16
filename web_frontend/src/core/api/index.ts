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
