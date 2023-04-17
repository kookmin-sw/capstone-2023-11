import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getKakaoAccessToken, getUserStatus } from "../core/api/index";
import { useEffect, useState } from "react";

function KakaoAuthPage() {
  const navigate = useNavigate();
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

  useEffect(() => {
    setAccessToken(data?.data.access_token);
  }, [data, accessToken]);
  useEffect(() => {
    if (loginData) {
      if (loginData.data.result == "login") {
        localStorage.setItem("accessToken", loginData.data.jwt);
        navigate("/senior/main");
      } else {
        if (loginData.data.userType == "userGuardian") {
          if (accessToken) {
            localStorage.setItem("kakaoAccesstoken", accessToken);
          }
          navigate("/join/guardian");
        }
        if (loginData.data.userType == "userWard") {
          if (accessToken) {
            localStorage.setItem("kakaoAccesstoken", accessToken);
          }
          navigate("/join/senior");
        }
      }
    }
  });
  return <></>;
}
export default KakaoAuthPage;
