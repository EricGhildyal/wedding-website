import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./home.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";

// Pics
import Pic1 from "../assets/pictures/e+p1.jpeg";
import Pic2 from "../assets/pictures/e+p2.jpg";
import Pic3 from "../assets/pictures/e+p3.jpeg";

const Home = () => {
  return (
    <div id="home-section">
      <Fade left delay={100}>
        <div className="pics">
          <Swiper
            key="home-swiper"
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation
            grabCursor={true}
          >
            <SwiperSlide className="slide">
              <img src={Pic2} alt="E+P-pic2" />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <img src={Pic1} alt="E+P-pic1" />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <img src={Pic3} alt="E+P-pic3" />
            </SwiperSlide>
          </Swiper>
        </div>
      </Fade>
      <Fade right delay={100}>
        <div className="info">
          <h2>We're Getting Married!</h2>
          <br />
          <p>
            August 6th, 2022 <br /> Boston, MA
          </p>
        </div>
      </Fade>
    </div>
  );
};

export default Home;
