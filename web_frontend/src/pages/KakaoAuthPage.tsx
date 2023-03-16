import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getKakaoAccessToken } from "../core/api/index";
import { useEffect, useState } from "react";

function KakaoAuthPage() {
  const [accessToken, setAccessToken] = useState();
  const router = useLocation();
  const authenticationCode = router.search.split("=")[1];
  const { data } = useQuery("accessToken", () => getKakaoAccessToken(authenticationCode), {
    enabled: !!authenticationCode,
  });
  useEffect(() => {
    setAccessToken(data?.data.access_token);
  }, [data]);
  console.log(accessToken);
  return <></>;
}
export default KakaoAuthPage;
