import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./registry.css";

// Pics
import Coupe from "../assets/registry/coupe.jpg";
import Blender from "../assets/registry/blender.jpg";
import Wine from "../assets/registry/wine.jpg";
import Car from "../assets/registry/car.jpg";
import Dinner from "../assets/registry/dinner.jpg";
import Bed from "../assets/registry/bed.jpg";
import Plane from "../assets/registry/plane.jpg";
import Italy from "../assets/registry/italy.jpg";
import Airbb from "../assets/registry/airbb.jpg";

const Registry = () => {
  return (
    <div id="registry-section">
      <Fade top delay={100}>
        <h1>REGISTRY</h1>
        <div className="registry-container">
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6031817"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Coupe} alt="pic1"></img>
              <div className="title">Edge Coupe Glass</div>
              <div className="location">Crate&Barrel</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6032789"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Blender} alt="pic1"></img>
              <div className="title">
                Breville Control Grip Immersion Blender
              </div>
              <div className="location">Sur La Table</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6031971"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Wine} alt="pic1"></img>
              <div className="title">Honeymoon Wine Tasting</div>
              <div className="location">Cash Registry</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6031977"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Car} alt="pic1"></img>
              <div className="title">Honeymoon Car Rental</div>
              <div className="location">Cash Registry</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6031980"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Dinner} alt="pic1"></img>
              <div className="title">Honeymoon Dinner for Two</div>
              <div className="location">Cash Registry</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6032818"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Bed} alt="pic1"></img>
              <div className="title">New Mattress and Bed Frame</div>
              <div className="location">Cash Registry</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6032821"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Plane} alt="pic1"></img>
              <div className="title">Honeymoon Round Trip Plane Tickets</div>
              <div className="location">Cash Registry</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6032822"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Italy} alt="pic1"></img>
              <div className="title">Honeymoon to Italy Fund</div>
              <div className="location">Cash Registry</div>
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.blueprintregistry.com/registry/eric-patrick?gift=6032823"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Airbb} alt="pic1"></img>
              <div className="title">Airbnb eGift Card</div>
              <div className="location">Cash Registry</div>
            </a>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Registry;
