import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";

// Our Imports
import "../App.css";
import "./stay.css";
import CheersIcon from "../assets/cheers.png";
import HotelIcon from "../assets/hotels/hotel.png";
import HotelRedIcon from "../assets/hotels/hotel-red.png";
import MapsStyle from "../assets/mapstyle.json";

// Hotel image imports
import ACHotel from "../assets/hotels/achotel.webp";
import RevolutionHotel from "../assets/hotels/revolutionhotel.jpg";
import StayPineappleHotel from "../assets/hotels/staypineapple.jpg";
import MarriotCopelyHotel from "../assets/hotels/marriotcopely.jpg";
import WestinCopelyHotel from "../assets/hotels/westincopely.jpg";
import HamptonWatertownHotel from "../assets/hotels/hamptonwatertown.jpg";

const Stay = ({ google }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div id="stay-section">
      <Fade top delay={100}>
        <h1>STAY</h1>
      </Fade>
      <Fade left delay={100}>
        <div className="carousel-content">
          <Swiper
            key="stay-swiper"
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation
            grabCursor={true}
            onSlideChange={(slide) => {
              setActiveSlide(slide.activeIndex);
            }}
            slidesPerView={1}
          >
            <SwiperSlide className="slide">
              <div className="container">
                <div className="pic rotate1">
                  <img src={ACHotel} alt="Hotel 1"></img>
                </div>
                <div className="title">
                  <a
                    href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1639601011502&key=GRP&app=resvlink"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>AC Hotel Downtown Boston</h2>
                  </a>
                </div>
                <div className="body">
                  <ul>
                    <li>8 min walk to the venue</li>
                    <li>
                      This is our recommended hotel for those wishing to stay in
                      the city for the wedding. It is the closest hotel to the
                      venue and is a short walk (or stumble) away. We've secured
                      a room block and group rate, so be sure to book using the
                      provided link if booking online, or group code if booking
                      by phone. There are plenty of nearby restaurants and it's
                      close to one of our favorite local cafe chains: Tatte!
                      Their brunch is sure to cure your hangover...not that we
                      know from experience.
                    </li>
                    <li>
                      Group rate: $239/night before taxes and fees
                      <br />
                      <a
                        href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1639601011502&key=GRP&app=resvlink"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Click here to use the group code to book a room
                      </a>
                      <br />
                      <span>
                        group code (for reserving by phone): BGWBGWA
                        <br />
                        Last Day to Book with Group Rate: Wednesday, July 6,
                        2022
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide">
              <div className="container">
                <div className="pic rotate2">
                  <img src={RevolutionHotel} alt="Hotel 2"></img>
                </div>
                <div className="title">
                  <a
                    href="https://www.provenancehotels.com/the-revolution-hotel"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>The Revolution Hotel</h2>
                  </a>
                </div>
                <div className="body">
                  <ul>
                    <li>10 min walk to the venue</li>
                    <li>
                      This artsy hotel will bring out your inner hipster.
                      There's a great cafe in the lobby and a mexican restaurant
                      connected. When booking, be sure to select a room with a
                      "Bathroom in Room," otherwise you'll be back to your
                      college days with a "Bathroom Down the Hall." Unless
                      that's the experience you're looking for, we won't judge.
                      This one is a bit closer to the heart of Boston's Back
                      Bay, while still in walking distance to the venue.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide">
              <div className="container">
                <div className="pic rotate1">
                  <img src={StayPineappleHotel} alt="Hotel 3"></img>
                </div>
                <div className="title">
                  <a
                    href="https://www.staypineapple.com/south-end-boston"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>Stay Pineapple</h2>
                  </a>
                </div>
                <div className="body">
                  <ul>
                    <li>12 minute walk to the venue</li>
                    <li>
                      Although the rooms are on the smaller side (you'll get a
                      feel of what city living is really like), this may be a
                      good alternative to the nearby Revolution Hotel. This one
                      is not far from Back Bay and in walking distance to the
                      venue. To{" "}
                      <span style={{ fontStyle: "italic" }}>sweeten</span> the
                      deal, they offer pineapple cookies daily!
                      #summerofthepineapple2022 🍍
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide">
              <div className="container">
                <div className="pic rotate2">
                  <img src={MarriotCopelyHotel} alt="Hotel 4"></img>
                </div>
                <div className="title">
                  <a
                    href="https://www.marriott.com/hotels/travel/bosco-boston-marriott-copley-place/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>Marriott Copley Place</h2>
                  </a>
                </div>
                <div className="body">
                  <ul>
                    <li>19 minute walk to venue</li>
                    <li>
                      A great choice for anyone looking to explore Boston's Back
                      Bay. This hotel is connected to the shops at the
                      Prudential center ("The Pru" as you'll hear it called) and
                      has the option of on-site self-parking with in and out
                      privileges. There is also an Old Town Trolley Tour stop
                      just outside the entrance for anyone looking for a hop
                      on-hop off guided trolley tour. Although a bit further
                      from the venue, it is still a safe and flat walk to
                      Brasserie.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide">
              <div className="container">
                <div className="pic rotate1">
                  <img src={WestinCopelyHotel} alt="Hotel 5"></img>
                </div>
                <div className="title">
                  <a
                    href="https://www.marriott.com/hotels/travel/boswi-the-westin-copley-place-boston/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>The Westin Copley Place</h2>
                  </a>
                </div>
                <div className="body">
                  <ul>
                    <li>20 minute walk to venue</li>
                    <li>
                      Steps from Copley Square, Boston Public Library, this is a
                      great option for those looking to do more sightseeing than
                      drinking while in town. Just like the Marriott Copley
                      Place, it is a safe and flat 20 minute walk to the venue.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide">
              <div className="container">
                <div className="pic rotate2">
                  <img src={HamptonWatertownHotel} alt="Hotel 6"></img>
                </div>
                <div className="title">
                  <a
                    href="https://www.hilton.com/en/hotels/boswwhx-hampton-suites-watertown-boston/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>Hampton Inn and Suites Watertown</h2>
                  </a>
                </div>
                <div className="body">
                  <ul>
                    <li>20-30 minute (6 mile) drive to venue</li>
                    <li>
                      For those not necessarily looking for a city view (or city
                      prices), this is a nice option just outside of the city,
                      located just next to Arsenal Yards shopping mall. We
                      highly suggest stopping by Frank Pepe's for a classic New
                      England "apizza"!
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </Fade>
      <Fade right delay={100}>
        <Map
          containerElement={<div className="map-container" />}
          mapElement={<div style={{ height: "100%" }} />}
          loadingElement={<div style={{ height: "100%" }} />}
          activeSlide={activeSlide}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnXFq3Qtg5v2dBpxd1pCqSGPknG4_H5_Y&v=3.exp"
        />
      </Fade>
    </div>
  );
};

const Map = withScriptjs(
  withGoogleMap((props, google) => (
    <GoogleMap
      defaultCenter={{
        lat: 42.3446312,
        lng: -71.0705311,
      }}
      defaultOptions={{ styles: MapsStyle }}
      defaultZoom={14.2}
      styles={MapsStyle}
    >
      <Marker
        title={"Brasserie"}
        position={{ lat: 42.3406742, lng: -71.0670825 }}
        icon={{
          url: CheersIcon,
          anchor: new window.google.maps.Point(45, 45),
          scaledSize: new window.google.maps.Size(45, 45),
        }}
      />
      <Marker
        title={"AC Hotel by Marriott Boston Downtown"}
        position={{ lat: 42.3447374, lng: -71.0621102 }}
        icon={{
          url: props.activeSlide === 0 ? HotelRedIcon : HotelIcon,
          anchor: new window.google.maps.Point(40, 40),
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
      <Marker
        title={"The Revolution Hotel"}
        position={{ lat: 42.3460872, lng: -71.0708392 }}
        icon={{
          url: props.activeSlide === 1 ? HotelRedIcon : HotelIcon,
          anchor: new window.google.maps.Point(40, 40),
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
      <Marker
        title={"Staypineapple"}
        position={{ lat: 42.3469813, lng: -71.0706742 }}
        icon={{
          url: props.activeSlide === 2 ? HotelRedIcon : HotelIcon,
          anchor: new window.google.maps.Point(40, 40),
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
      <Marker
        title={"Boston Marriott Copley Place"}
        position={{ lat: 42.3471622, lng: -71.079366 }}
        icon={{
          url: props.activeSlide === 3 ? HotelRedIcon : HotelIcon,
          anchor: new window.google.maps.Point(40, 40),
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
      <Marker
        title={"The Westin Copley Place"}
        position={{ lat: 42.3483555, lng: -71.077669 }}
        icon={{
          url: props.activeSlide === 4 ? HotelRedIcon : HotelIcon,
          anchor: new window.google.maps.Point(40, 40),
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
      <Marker
        title={"Hampton Inn & Suites Watertown"}
        position={{ lat: 42.3625165, lng: -71.159865 }}
        icon={{
          url: props.activeSlide === 5 ? HotelRedIcon : HotelIcon,
          anchor: new window.google.maps.Point(40, 40),
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
    </GoogleMap>
  ))
);

export default Stay;
