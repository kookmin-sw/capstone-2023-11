import axios from "axios";
import { DOMAIN } from "../../constants/domain";

export const fetchPillInfo = async (value: string) => {
  const response = axios.get(
    `https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService03/getDrugPrdtPrmsnDtlInq02?serviceKey=${process.env.REACT_APP_SERVICE_KEY}&type=json&item_name=${value}`,
  );

  return response;
};

export const fetchPillImg = async (value: string) => {
  const response = axios.get(
    `https://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01?serviceKey=${process.env.REACT_APP_SERVICE_KEY}&numOfRows=3&pageNo=1&type=json&item_name=${value}`,
  );

  return response;
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
    [
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
      },
    ],
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    },
  );

  return data;
};

export const modifyPillData = async (
  id: number,
  daysToTake: number,
  breakfast: boolean,
  lunch: boolean,
  dinner: boolean,
) => {
  const data = axios.patch(
    `${process.env.REACT_APP_SERVER}/api/medicine/${id}`,
    {
      daysToTake: daysToTake,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    },
  );

  return data;
};

export const deletePillData = async (id: number) => {
  const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/medicine/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return response;
};

export const getPillInfo = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/medicine/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return response.data;
};

export const getSeniorInfo = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/userward/main`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return response.data;
};

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

export const guardianJoin = async (wardCodes: number[], email: string) => {
  const data = axios.post(
    `${process.env.REACT_APP_SERVER}/api/join/guardian`,
    { wardCodes: wardCodes, email: email, kakaoAccesstoken: localStorage.getItem("kakaoAccesstoken") },
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

export const wardModify = async (
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
  const data = axios.patch(
    `${process.env.REACT_APP_SERVER}/api/userward/modify`,
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
    { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } },
  );
  return data;
};

export const checkMeal = async (file: FormData) => {
  const data = axios.post(`${process.env.REACT_APP_SERVER}/api/food/detect`, file, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;
};
export const getExerciseList = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/workout/category`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  return data;
};

export const uploadMeal = async (file: FormData) => {
  const data = axios.post(`${process.env.REACT_APP_SERVER}/api/food`, file, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
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

export const getRecordMeal = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/food`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getDailyData = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userward/summary/daily`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getWeeklyData = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userward/summary/weekly`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getGuardianData = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userward/connected-guardians`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  return data;
};

export const getGuardianExerciseList = async (wardId: number) => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/workout/records`, {
    params: {
      wardId: wardId,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getGuardianMealList = async (wardId: number) => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/food`, {
    params: {
      wardId: wardId,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getGuardianCalendar = async (wardId: number) => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/calendar`, {
    params: {
      wardId: wardId,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getGuardianDaily = async (wardId: number) => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/summary/daily`, {
    params: {
      wardId: wardId,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getGuardianWeekly = async (wardId: number) => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/summary/weekly`, {
    params: {
      wardId: wardId,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getGuardianPill = async (wardId: number) => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/medicine`, {
    params: {
      wardId: wardId,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data;
};

export const getSeniorData = async () => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/connected-wards`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  return data;
};
export const postSeniorCode = async (code: number) => {
  const data = axios.post(`${process.env.REACT_APP_SERVER}/api/userguardian/connect`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    body: {
      code,
    },
  });

  return data;
};
export const getSeniorTotalWatched = async (wardId: string) => {
  const data = axios.get(`${process.env.REACT_APP_SERVER}/api/userguardian/main?wardId=${wardId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });

  return data;
};
