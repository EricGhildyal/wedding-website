import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./where.css";
import Brasserie from "../assets/brasserie.jpg";
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
            <img className="pic1" src={Brasserie} alt="Brasserie Pic 1" />
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
              Eric insisted, a few months ago.
              <br />
              <span style={{ fontStyle: "italic" }}>
                "That's mostly you, but we can look into it..."
              </span>{" "}
              sighed Patrick, not knowing what he was getting into. <br />
              <br />
              Within about 2 weeks, we visited 7 restaurants in the Boston area.
              Partly for fun, partly for trying places we usually wouldn't, but
              mostly for the free congratulatory drinks. On our final tour, we
              found a quaint local Parisian-style brasserie called, well...
              Brasserie! Their friendly atmosphere and stellar cuisine put them
              at the top of our list instantly. Plus, it's kind of on theme
              after the whole engagement in Paris thing!
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Where;
