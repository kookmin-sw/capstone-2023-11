import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getSeniorData } from "../core/api";
import { useNavigate } from "react-router-dom";

export default function GuardianMainPage() {
  const { data } = useQuery("senior", () => getSeniorData());
  console.log(data);
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StGuardianMainPage>
        <StTitle>관리중인 시니어</StTitle>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper">
          {data?.data.map((senior: any) => (
            <SwiperSlide>
              <StSeniorCard>
                <StTag>관제중</StTag>
                <StInfoContainer>
                  {senior.gender === "MALE" ? (
                    <img src={require("../assets/images/img_old-man.png")} alt="senior" />
                  ) : (
                    <img src={require("../assets/images/img_old-woman.png")} alt="senior" />
                  )}

                  <StSeniorName>{senior.name}</StSeniorName>
                  <StSeniorDate>{senior.birthday} 출생</StSeniorDate>
                  <StCardText>
                    🔐 유저 코드 : <StCardTag># {senior.kakaoAccountId}</StCardTag>
                  </StCardText>
                  <StCardText>{senior.gender === "MALE" ? <>🙆‍♂️ 남성</> : <>🙆‍♀️ 여성</>}</StCardText>
                  <StCardText>📏 키: {senior.height}cm</StCardText>
                  <StCardText>📝 현재 체중: {senior.weight}kg</StCardText>
                </StInfoContainer>
                <StCheckButton onClick={() => navigate("/guardian/" + senior.kakaoAccountId + "/main")}>
                  자세히 보기
                </StCheckButton>
              </StSeniorCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </StGuardianMainPage>
    </motion.div>
  );
}

const StGuardianMainPage = styled.div`
  .swiper {
    width: 30rem;
    height: 55rem;
    border-radius: 1rem;
  }
  img {
    width: 30rem;
    height: 55rem;
    border-radius: 1rem;
  }
  .swiper-slide {
    margin-top: 3rem;
    border-radius: 1rem;
  }
`;

const StSeniorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fe;
  width: 30rem;
  height: 55rem;
  border-radius: 2rem;
`;
const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2.3rem;
  text-align: center;
  align-self: center;
  margin-top: 2rem;
`;

const StSeniorName = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 2.2rem;
`;
const StSeniorDate = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 1.3rem;
  color: #71727a;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
`;
const StCardText = styled.p`
  font-size: 1.4rem;
  font-family: "Pretendard-Bold";
  margin-bottom: 1rem;
`;
const StCheckButton = styled.button`
  width: 25rem;
  height: 3.8rem;
  background-color: #006ffd;
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  position: relative;

  margin-bottom: 2rem;
`;
const StInfoContainer = styled.div`
  width: 25rem;
  margin-top: 12rem;
  margin-bottom: 1rem;
  img {
    width: 13rem;
    height: 13rem;
    margin-bottom: 2rem;
  }
`;
const StCardTag = styled.span`
  width: 5rem;
  height: 1rem;
  background-color: #006ffd;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-radius: 1rem;
  color: white;
  font-family: "Pretendard-Bold";
`;
const StTag = styled.div`
  font-size: 1.4rem;
  width: 7rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #006ffd;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-radius: 1rem;
  color: white;
  font-family: "Pretendard-Bold";
  position: relative;
  left: 10rem;
  top: 2rem;
`;
