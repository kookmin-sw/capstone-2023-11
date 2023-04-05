import axios from "axios";
import { DOMAIN } from "../../constants/domain";

// const KAKAOPill = `https://2930a5f2-4986-4c91-af31-a632271e9ffc.api.kr-central-1.kakaoi.io/ai/ocr/b394473530514a6783e2e527424900f5`;

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

export const checkMeal = async (file: FormData) => {
  const data = axios.post(`${process.env.REACT_APP_SERVER}/api/food`, file, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;
};

export const pillImg = async (file: FormData) => {
  const data = axios.post(`${process.env.REACT_APP_SERVER}/api/medicine/ocr`, file, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;
};

export const pillData = async (file: FormData) => {
  const data = axios.post(`${process.env.REACT_APP_SERVER}/api/medicine`, file, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

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

export async function fetchPillInfo(value: string) {
  return fetch(
    `https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService03/getDrugPrdtPrmsnDtlInq02?serviceKey=zKSH%2F9jINWNjCG3mSkBuStun63jSwB2Ydqc3KY68unj1wo50jqvFuJBtVSv3ZIt1F12IZh9aJyXSgUzN%2BY8Y9Q%3D%3D&type=json&item_name=${value}`,
  ).then((response) => response.json());
}

export async function fetchPillImg(value: string) {
  return fetch(
    `http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?serviceKey=zKSH%2F9jINWNjCG3mSkBuStun63jSwB2Ydqc3KY68unj1wo50jqvFuJBtVSv3ZIt1F12IZh9aJyXSgUzN%2BY8Y9Q%3D%3D&numOfRows=3&pageNo=1&type=json&item_name=${value}`,
  ).then((response) => response.json());
}

export const pillInfoData = async (
  name: string | undefined,
  companyName: string | undefined,
  depositMethod: string | undefined,
  effect: string | undefined,
  useMethod: string | undefined,
  caution: string | undefined,
  imageUrl: string | undefined,
  breakfast: boolean,
  lunch: boolean,
  dinner: boolean,
  daysToTake: number,
) => {
  const data = axios.post(
    `${process.env.REACT_APP_SERVER}/api/medicine`,
    {
      name: name,
      companyName: companyName,
      depositMethod: depositMethod,
      effect: effect,
      useMethod: useMethod,
      caution: caution,
      imageUrl: imageUrl,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      daysToTake: daysToTake,
      kakaoAccesstoken: localStorage.getItem("kakaoAccesstoken"),
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    },
  );
  return data;
};
