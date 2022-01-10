import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./where.css";
import BrasserieLogo from "../assets/brasserie_logo.png";
import Brasserie1 from "../assets/brasserie1.jpg";
import Brasserie2 from "../assets/brasserie2.jpg";

const Where = () => {
  return (
    <div id="where-section">
      <Fade top delay={100}>
        <h1>WHERE</h1>
      </Fade>
      <div className="wrapper">
        <Fade right>
          <div className="pics">
            <img className="logo" src={BrasserieLogo} alt="Brasserie Logo" />
            <img className="pic1" src={Brasserie1} alt="Brasserie Pic 1" />
            <img className="pic2" src={Brasserie2} alt="Brasserie Pic 2" />
          </div>
        </Fade>
        <Fade delay={200} left>
          <div className="address">
            <a
              href="https://goo.gl/maps/mScTcmLrF3h5RUN78"
              target="_blank"
              rel="noreferrer"
            >
              <h2>560 Harrison Ave</h2>
              <h2>Boston, MA 02118</h2>
            </a>
          </div>
          <div className="info">
            <p>
              <span style={{ fontStyle: "italic" }}>
                "All anyone cares about is the food!"
              </span>{" "}
              said Eric, a few months ago.
              <br />
              <span style={{ fontStyle: "italic" }}>
                "That's mostly you, but we can look into it..."
              </span>{" "}
              said Patrick, not knowing what he was getting into. <br />
              <br />
              We visited 7 restaurants in the Boston area. Partly for fun,
              partly for trying places we usually wouldn't, but mostly for the
              free congratulatory drinks. On our final tour, we found a quaint
              local Parisian-style brasserie called, well... Brasserie! Their
              friendly atmosphere and stellar cuisine put them at the top of the
              list instantly. Plus, it's kind of on theme after the whole
              engagement in Paris thing!
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Where;
