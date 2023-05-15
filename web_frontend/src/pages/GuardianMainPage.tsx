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

export default function App() {
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
        <SwiperSlide>
          <StSeniorCard>
            <StSeniorName>김딸기</StSeniorName>
            <StSeniorDate>1973.01.01</StSeniorDate>
            <StCardText>73살</StCardText>
            <StCardText>남성</StCardText>
            <StCardText>키: 183cm</StCardText>
            <StCardText>현재 체중: 73kg</StCardText>
            <StCheckButton>자세히 보기</StCheckButton>
          </StSeniorCard>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
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
  font-size: 2rem;
`;
const StSeniorDate = styled.p``;
const StCardText = styled.p``;
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
