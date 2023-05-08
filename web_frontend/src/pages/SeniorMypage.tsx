import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import { getSeniorInfo } from "../core/api";
import { motion } from "framer-motion";

function SeniorMypage() {
  const navigate = useNavigate();
  const [firstApi, setFirstApi] = useState(true);
  const { data } = useQuery("userData", () => getSeniorInfo(), {
    enabled: !!firstApi,
  });

  useEffect(() => {
    setFirstApi(false);
  }, [data]);

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
      <StSeniorMypage>
        <BackButton />
        <StIntroText>안녕하세요 {data?.userName}님!</StIntroText>
        <StInfoContainer>
          <StProfilePhoto src={require("../assets/images/img_avatar.png")} />
          <StName>{data?.userName}</StName>
          <StUserCode># {data?.userCode}</StUserCode>
        </StInfoContainer>

        <StButtonContainer onClick={() => navigate("#")}>
          <StButtonInfo>개인정보 변경하기</StButtonInfo>
          <StButtonIcon src={require("../assets/images/img_right.png")} />
        </StButtonContainer>
        <StButtonContainer onClick={() => navigate("#")}>
          <StButtonInfo>등록되어 있는 보호자</StButtonInfo>
          <StButtonIcon src={require("../assets/images/img_right.png")} />
        </StButtonContainer>
        <StLogContainer>
          <StLogoutButton onClick={() => navigate(`/login`)}>로그아웃</StLogoutButton>
        </StLogContainer>
      </StSeniorMypage>
    </motion.div>
  );
}

export default SeniorMypage;

const StSeniorMypage = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const StIntroText = styled.span`
  font-family: "Pretendard-Bold";
  font-size: 3.2rem;
  margin-top: 3.5rem;
  margin-left: 2.2rem;
  letter-spacing: -0.05rem;
  text-align: center;
`;
const StInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5.7rem;
  margin-bottom: 3.3rem;
`;

const StProfilePhoto = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1rem;
`;

const StName = styled.span`
  font-family: "Pretendard-Bold";
  font-size: 1.7rem;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
`;

const StUserCode = styled.span`
  font-family: "Pretendard-Bold";
  font-size: 1.5rem;
  color: #71727a;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2.3rem;
  margin-right: 2.3rem;
  cursor: pointer;
`;

const StButtonInfo = styled.span`
  font-size: 2rem;
  font-family: "Pretendard-Regular";
  padding: 1.6rem;
`;

const StButtonIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 1.7rem;
  margin-right: 1.6rem;
`;
const StLogContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StLogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.6rem;
  height: 4rem;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  color: #006ffd;
  font-family: "Pretendard-Bold";
  font-size: 1.5rem;
  background-color: white;
  margin-top: 9rem;
`;
