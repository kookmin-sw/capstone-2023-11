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

export const guardianJoin = async (wardCodes: number[]) => {
  const data = axios.post(
    `${process.env.REACT_APP_SERVER}/api/join/guardian`,
    { wardCodes: wardCodes, kakaoAccesstoken: localStorage.getItem("kakaoAccesstoken") },
    {},
  );

  console.log(data);
  return data;
};
export const wardJoin = async (
  height: number,
  weight: number,
  drinkings: number,
  smoke: number,
  year: number,
  month: number,
  day: number,
  genderType: string,
  ills: string[],
) => {
  const data = axios.post(
    `${process.env.REACT_APP_SERVER}/api/join/ward`,
    {
      height: height,
      weight: weight,
      drinkings: drinkings,
      smoke: smoke,
      year: year,
      month: month,
      day: day,
      genderType: genderType,
      ills: ills,
    },
    {},
  );
  return data;
};
