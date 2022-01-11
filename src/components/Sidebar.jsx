import React, { useState } from "react";

// 3rd Party Imports
import { useScrollSection } from "react-scroll-section";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./sidebar.css";
import MenuIcon from "../assets/menu.svg";
import CloseIcon from "../assets/close.svg";
import Logo from "../assets/logos/logo.png";
import LogoWhite from "../assets/logos/logoWhite.png";

const Sidebar = ({ isMobile }) => {
  // Sections
  const introSection = useScrollSection("intro");
  const homeSection = useScrollSection("home");
  const whereSection = useScrollSection("where");
  const staySection = useScrollSection("stay");
  const rsvpSection = useScrollSection("rsvp");
  const registrySection = useScrollSection("registry");
  const faqSection = useScrollSection("faq");

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="sidebar">
      {isMobile && (
        <div>
          <button
            className="normalize-button"
            onClick={(e) => {
              e.preventDefault();
              setMobileSidebarOpen(!mobileSidebarOpen);
            }}
          >
            <img height={25} width={25} src={MenuIcon} alt="Open Menu" />
          </button>
          {mobileSidebarOpen && (
            // Set Height and Width here so we can use JS constants
            <div
              className="links"
              style={{ height: window.innerHeight, width: window.innerWidth }}
            >
              <Fade left cascade duration={200}>
                <button
                  className="close"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileSidebarOpen(false);
                  }}
                >
                  <img
                    height={25}
                    width={25}
                    src={CloseIcon}
                    alt="Close Menu"
                  />
                </button>
                <button onClick={introSection.onClick}>
                  <img className="logo" src={LogoWhite} alt="logo" />
                </button>

                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    homeSection.onClick();
                  }}
                  className={homeSection.selected ? "selected" : ""}
                >
                  <div>Home</div>
                </button>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    whereSection.onClick();
                  }}
                  className={whereSection.selected ? "selected" : ""}
                >
                  <div>Where</div>
                </button>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    staySection.onClick();
                  }}
                  className={staySection.selected ? "selected" : ""}
                >
                  <div>Stay</div>
                </button>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    rsvpSection.onClick();
                  }}
                  className={rsvpSection.selected ? "selected" : ""}
                >
                  <div>RSVP</div>
                </button>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    registrySection.onClick();
                  }}
                  className={registrySection.selected ? "selected" : ""}
                >
                  <div>Registry</div>
                </button>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    faqSection.onClick();
                  }}
                  className={faqSection.selected ? "selected" : ""}
                >
                  <div>FAQ</div>
                </button>
              </Fade>
            </div>
          )}
        </div>
      )}
      {!isMobile && (
        <div>
          <Fade left opposite>
            <button onClick={introSection.onClick}>
              <img className="logo" src={Logo} alt="logo" />
            </button>
          </Fade>
          <Fade left opposite>
            <div className="links">
              <button
                onClick={homeSection.onClick}
                className={homeSection.selected ? "selected" : ""}
              >
                <div>Home</div>
              </button>
              <button
                onClick={whereSection.onClick}
                className={whereSection.selected ? "selected" : ""}
              >
                <div>Where</div>
              </button>
              <button
                onClick={staySection.onClick}
                className={staySection.selected ? "selected" : ""}
              >
                <div>Stay</div>
              </button>
              <button
                onClick={rsvpSection.onClick}
                className={rsvpSection.selected ? "selected" : ""}
              >
                <div>RSVP</div>
              </button>
              <button
                onClick={registrySection.onClick}
                className={registrySection.selected ? "selected" : ""}
              >
                <div>Registry</div>
              </button>
              <button
                onClick={faqSection.onClick}
                className={faqSection.selected ? "selected" : ""}
              >
                <div>FAQ</div>
              </button>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
