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
      kakaoAccesstoken: localStorage.getItem("kakaoAccesstoken"),
      ills: ills,
    },
    {},
  );
  return data;
};

export const getExerciseList = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/workout/category`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  return data;
};

export const postExerciseList = async (type: string, hour: number) => {
  const data = axios.post(
    `${process.env.REACT_APP_SERVER}/api/workout`,
    {
      type: type,
      hour: hour,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    },
  );
  return data;
};

export const getRecordExerciseList = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/workout/records`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  return data;
};

export const deleteExerciseList = async (id: number) => {
  const data = axios.delete(`${process.env.REACT_APP_SERVER}/api/workout/records/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getCalendarDate = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/calendar`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};
