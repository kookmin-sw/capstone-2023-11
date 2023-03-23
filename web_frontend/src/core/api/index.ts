import axios from "axios";

const pillURL = `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=`;
const pillKEY = `zKSH%2F9jINWNjCG3mSkBuStun63jSwB2Ydqc3KY68unj1wo50jqvFuJBtVSv3ZIt1F12IZh9aJyXSgUzN%2BY8Y9Q%3D%3D`;
// const KAKAOPill = `https://2930a5f2-4986-4c91-af31-a632271e9ffc.api.kr-central-1.kakaoi.io/ai/ocr/b394473530514a6783e2e527424900f5`;

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

export async function fetchPillInfo(pillID: string) {
  return fetch(`${pillURL}${pillKEY}&itemName=${pillID}`).then((response) => response.json());
}
