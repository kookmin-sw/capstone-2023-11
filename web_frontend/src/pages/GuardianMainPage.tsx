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
          <StSeniorCard></StSeniorCard>
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
