import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./pics.css";

const Pics = () => {
  return (
    <div id="pics-section">
      <Fade left delay={100}>
        <div className="hero">
          <form action="https://photos.app.goo.gl/ATuWGyjf5S2r9c9Q7">
            <button type="submit" className="custom-btn btn-3">
              <span>View Gallery</span>
            </button>
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default Pics;
