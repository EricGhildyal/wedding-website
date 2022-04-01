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
                <td colspan="4" rowspan="8">
                  Welcome Reception
                  <br />
                  <br />
                  🍸 🍗 🍺 🍽️
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
                <td colspan="4" rowspan="1">
                  Welcome Drinks <br /> 🍸 🍺
                </td>
              </tr>
              <tr>
                <th>5:30</th>
                <td colspan="4">
                  Ceremony <br /> 👨‍❤️‍👨 💍
                </td>
              </tr>
              <tr>
                <th>6:00</th>
                <td colspan="4" rowspan="1">
                  Reception <br /> 🍺 🍷
                </td>
              </tr>
              <tr>
                <th>6:30</th>
                <td colspan="4" rowspan="4">
                  Seated Dinner <br /> 🍽️ 🍗
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
                <td colspan="4" rowspan="5">
                  Dancing <br /> 🕺🏽 💃
                </td>
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
                <td colspan="4" class="blue">
                  <span style={{ textDecoration: "line-through" }}>
                    Go To Sleep <br /> 🏠 🛌
                  </span>
                </td>
              </tr>
              <tr>
                <th>11:30</th>
                <td colspan="4" rowspan="2" class="blue">
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
