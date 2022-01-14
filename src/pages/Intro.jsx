import React from "react";
import Fade from "react-reveal/Fade";
import { useScrollSection } from "react-scroll-section";

// Our Imports
import "../App.css";
import "./intro.css";
import Boston from "../assets/boston_skyline_beige.svg";
import Chevron from "../assets/chevron.png";

const Names = () => {
  return (
    <div>
      <Fade top cascade>
        <div className="names">
          <div className="name">
            <div className="firstname">ERIC</div>
            <div className="lastname right">ghildyal</div>
          </div>

          <div className="amp">&</div>
          <div className="name">
            <div className="firstname">PATRICK</div>
            <div className="lastname">bohse</div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

const Intro = () => {
  const homeSection = useScrollSection("home");

  return (
    <div id="intro-section">
      <div className="intro-wrapper">
        <Names />
      </div>
      <div className="chevron">
        <button onClick={homeSection.onClick}>
          <img src={Chevron} alt="chevron"></img>
        </button>
      </div>

      <Fade right>
        <div className="skyline">
          <img src={Boston} alt="Boston Skyline" />
        </div>
      </Fade>
    </div>
  );
};

export default Intro;
