import axios from "axios";

export const getKakaoAccessToken = async (authorization: string) => {
  const data = axios.post(
    `https://kauth.kakao.com/oauth/token`,
    {},
    {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
        redirect_uri: "/auth/kakao",
        code: authorization,
      },
    },
  );
  return data;
};
