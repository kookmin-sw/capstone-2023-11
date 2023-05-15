import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getKakaoAccessToken, getUserStatus } from "../core/api/index";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { adviceAtom, nameAtom } from "../core/atom";

function KakaoAuthPage() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState();
  const router = useLocation();
  const setNameAtom = useSetRecoilState(nameAtom);
  const setAdviceAtom = useSetRecoilState(adviceAtom);
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
      if (loginData.data.result == "login" && localStorage.getItem("userStatus") == "userWard") {
        localStorage.setItem("accessToken", loginData.data.jwt);
        navigate("/senior/main");
      } else if (loginData.data.result == "login" && localStorage.getItem("userStatus") == "userGuardian") {
        localStorage.setItem("accessToken", loginData.data.jwt);
        navigate("/guardian/main");
      } else {
        setAdviceAtom("");
        if (loginData.data.userType == "userGuardian") {
          if (accessToken) {
            localStorage.setItem("kakaoAccesstoken", accessToken);
          }
          setNameAtom(loginData.data.name);
          navigate("/join/guardian");
        }
        if (loginData.data.userType == "userWard") {
          if (accessToken) {
            localStorage.setItem("kakaoAccesstoken", accessToken);
          }
          setNameAtom(loginData.data.name);
          navigate("/join/senior");
        }
      }
    }
  });
  return <></>;
}
export default KakaoAuthPage;
