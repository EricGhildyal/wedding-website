import React from "react";
import Fade from "react-reveal/Fade";

// Our Imports
import "../App.css";
import "./schedule.css";

const Schedule = () => {
  return (
    <div id="schedule-section">
      <Fade top delay={100}>
        <h1>Schedule</h1>
      </Fade>
      <Fade right>
        <div className="table-wrapper">
          <div className="table-1">
            <h2>Friday, August 5th</h2>
            <p>
              <a
                href="https://www.clerysboston.com/"
                target="_blank"
                rel="noreferrer"
              >
                Clerys
              </a>{" "}
              - 113 Dartmouth St, Boston, MA 02116
            </p>
            <table>
              <tr>
                <th>6:00</th>
                <td colSpan="4" rowSpan="8">
                  Welcome Reception
                  <br />
                  <span style={{ fontSize: 15 }}>Dinner & Drinks</span>
                  🍸 🍽️ 🍺 🍝
                </td>
              </tr>
              <tr>
                <th>6:30</th>
              </tr>
              <tr>
                <th>7:00</th>
              </tr>
              <tr>
                <th>7:30</th>
              </tr>
              <tr>
                <th>8:00</th>
              </tr>
              <tr>
                <th>8:30</th>
              </tr>
              <tr>
                <th>9:00</th>
              </tr>
              <tr>
                <th>???</th>
              </tr>
            </table>
          </div>
          <div className="table-2">
            <h2>Saturday, August 6th</h2>
            <p>
              <a
                href="https://www.brasserieboston.com/"
                target="_blank"
                rel="noreferrer"
              >
                Brasserie
              </a>{" "}
              - 560 Harrison Ave, Boston, MA 02118
            </p>
            <table>
              <tr>
                <th>5:00</th>
                <td colSpan="4" rowSpan="3">
                  Ceremony & Cokctail Hour <br /> 👨‍❤️‍👨 🍸 💍 🍺
                </td>
              </tr>
              <tr>
                <th>5:30</th>
              </tr>
              <tr>
                <th>6:00</th>
              </tr>
              <tr>
                <th>6:30</th>
                <td colSpan="4" rowSpan="9">
                  Dinner, Drinks & Dancing <br /> 🍽️ 🕺🏽 🍝 💃
                </td>
              </tr>
              <tr>
                <th>7:00</th>
              </tr>
              <tr>
                <th>7:30</th>
              </tr>
              <tr>
                <th>8:00</th>
              </tr>
              <tr>
                <th>8:30</th>
              </tr>
              <tr>
                <th>9:00</th>
              </tr>
              <tr>
                <th>9:30</th>
              </tr>
              <tr>
                <th>10:00</th>
              </tr>
              <tr>
                <th>10:30</th>
              </tr>
              <tr>
                <th>11:00</th>
                <td colSpan="4" className="blue">
                  <span style={{ textDecoration: "line-through" }}>
                    Go To Sleep <br /> 🏠 🛌
                  </span>
                </td>
              </tr>
              <tr>
                <th>11:30</th>
                <td colSpan="4" rowSpan="2" className="blue">
                  After Party <br /> 💃 🍺
                </td>
              </tr>
              <tr>
                <th>???</th>
              </tr>
            </table>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Schedule;
