import "./App.css";
import { useState, useEffect, useRef } from "react";

// 3rd Party Imports
import { ScrollingProvider, Section } from "react-scroll-section";

// Components
import Sidebar from "./components/Sidebar.jsx";
import Intro from "./pages/Intro.jsx";
import Home from "./pages/Home.jsx";
import Where from "./pages/Where";
import Schedule from "./pages/Schedule";
import Stay from "./pages/Stay";
import RSVP from "./pages/RSVP";
import Registry from "./pages/Registry";
import FAQ from "./pages/FAQ";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(true);
  const [, setHeight] = useState(0);

  const homeRef = useRef(null);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
    // eslint-disable-next-line
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = homeRef.current.offsetTop - (isMobile ? 150 : 450);
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <ScrollingProvider scrollBehavior="smooth">
      {!isVisible && <Sidebar isMobile={isMobile} />}
      <Section id="intro">
        <Intro />
      </Section>
      <Section id="home">
        <div ref={homeRef} />
        <Home />
      </Section>
      <Section id="where">
        <Where />
      </Section>
      <Section id="schedule">
        <Schedule />
      </Section>
      <Section id="stay">
        <Stay />
      </Section>
      <Section id="rsvp">
        <RSVP />
      </Section>
      <Section id="registry">
        <Registry />
      </Section>
      <Section id="faq">
        <FAQ />
      </Section>
      <div className="copyright">© 2022 Eric Ghildyal All Rights Reserved.</div>
    </ScrollingProvider>
  );
}

export default App;
