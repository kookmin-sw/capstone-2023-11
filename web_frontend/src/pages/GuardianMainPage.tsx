import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getSeniorData } from "../core/api";

export default function GuardianMainPage() {
  const { data } = useQuery("senior", () => getSeniorData());
  console.log(data?.data);
  return (
    <StGuardianMainPage>
      <StTitle>관리중인 시니어</StTitle>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper">
        {data?.data.map((senior: any) => (
          <SwiperSlide>
            <StSeniorCard>
              <StInfoContainer>
                <img src={require("../assets/images/img_couple.png")} alt="senior" />
                <StSeniorName>{senior.name}</StSeniorName>
                <StSeniorDate>{senior.birthday} 출생</StSeniorDate>
                <StCardText>🔐 유저 코드 : #{senior.kakaoAccountId}</StCardText>
                <StCardText>{senior.gender === "MALE" ? <>🙆‍♂️ 남성</> : <>🙆‍♀️ 여성</>}</StCardText>
                <StCardText>키: {senior.height}cm</StCardText>
                <StCardText>현재 체중: {senior.weight}kg</StCardText>
              </StInfoContainer>
              <StCheckButton>자세히 보기</StCheckButton>
            </StSeniorCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </StGuardianMainPage>
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
  bottom: 0rem;
  margin-bottom: 2rem;
`;
const StInfoContainer = styled.div`
  width: 25rem;
  img {
    width: 10rem;
    height: 10rem;
  }
`;
