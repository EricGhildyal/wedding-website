import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./rsvp.css";

const RSVP = () => {
  return (
    <div id="rsvp-section">
      <Fade top delay={100}>
        <h1>RSVP</h1>
        <p style={{ fontSize: 80 }}>Coming Soon!</p>
      </Fade>
    </div>
  );
};

export default RSVP;
