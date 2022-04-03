import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import Accordion from "../components/Accordion";

const FAQ = () => {
  return (
    <div id="faq-section">
      <Fade top delay={100}>
        <h1>FAQ</h1>
      </Fade>
      <Fade right>
        <div className="wrapper">
          <Accordion
            panels={[
              {
                label: "Do I need to be vaccinated to attend?",
                content: (
                  <div style={{ margin: 0 }}>
                    YES, to ensure our family and friends can celebrate safely,
                    we are requiring all adults to be vaccinated to attend. The
                    City of Boston implemented a vaccine requirement for
                    everyone 5 years of age and older at the start of 2022.
                    While the citywide mandate has since been lifted, the future
                    of the pandemic is uncertain, and this mandate may be
                    reinstated in the future. To prepare for this, we are asking
                    all adults to upload proof of vaccination with their RSVP.
                    <br />
                    <br />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.boston.gov/departments/mayors-office/introducing-b-together"
                      style={{ color: "#fff", textDecoration: "underline" }}
                    >
                      Click here for more details
                    </a>
                    <br />
                    <br />
                    Acceptable proof of vaccination:
                    <ul>
                      <li>a CDC vaccination card</li>
                      <li>a digital image of your CDC card</li>
                      <li>an image of any official immunization record</li>
                      <li>
                        a City of Boston app or any other COVID vaccine
                        verification app
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                label: "When is the RSVP deadline?",
                content:
                  'The RSVP deadline is July 6th, 2022. You can RSVP right now under the "RSVP" section of this website!',
              },
              {
                label: "Is the wedding indoors or outdoors?",
                content:
                  "Both! The cocktail hour and ceremony will be outside on Brasserie's umbrella-covered patio, while dinner and dancing will be inside. We have the entire restaurant for the night so you can always go back outside if you want a breath of fresh air.",
              },
              {
                label: "What will the weather be like?",
                content:
                  "It's Boston, so your guess is as good as ours! August has an average high of 80°F (27°C) and a lower chance of rain.",
              },
              {
                label: "What should I wear?",
                content:
                  "Leave the 3-piece tux or ball gown for your typical wedding, this is Eric and Patrick's Boston summer wedding! We're going for a dressy-casual aesthetic, so don't worry if you \"forget\" your tie at home.",
              },
              {
                label:
                  "Is it okay to take pictures with our phones during the wedding?",
                content:
                  "Yes! We would love for you to take photos and share them with everyone later. However, please refrain from taking photos during the ceremony, we'll share our professional photos with you as soon as they're ready on this website.",
              },
              {
                label: "Is there parking at the restaurant?",
                content:
                  "While we'd prefer our guests to enjoy the night without worrying about their car, the restaurant does have a free parking lot right next door. You must validate your ticket with a member of the staff.",
              },
            ]}
          />
        </div>
      </Fade>
    </div>
  );
};

export default FAQ;
