import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getKakaoAccessToken, getUserStatus } from "../core/api/index";
import { useEffect, useState } from "react";

function KakaoAuthPage() {
  const [accessToken, setAccessToken] = useState();
  const router = useLocation();
  const authenticationCode = router.search.split("=")[1];
  const { data } = useQuery("accessToken", () => getKakaoAccessToken(authenticationCode), {
    enabled: !!authenticationCode,
  });
  const { data: loginData } = useQuery(
    "userStatus",
    () => getUserStatus(localStorage.getItem("userStatus"), accessToken),
    {
      enabled: !!accessToken,
    },
  );
  console.log(loginData);
  useEffect(() => {
    setAccessToken(data?.data.access_token);
  }, [data, accessToken]);

  return <></>;
}
export default KakaoAuthPage;
