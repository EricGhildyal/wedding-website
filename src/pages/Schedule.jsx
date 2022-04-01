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
        <table>
          <tr>
            <th>5:00</th>
            <td colspan="4" rowspan="1">
              Welcome Drinks - 🍸 🍺
            </td>
          </tr>
          <tr>
            <th>5:30</th>
            <td colspan="4">Ceremony - 👨‍❤️‍👨 💍</td>
          </tr>
          <tr>
            <th>6:00</th>
            <td colspan="4" rowspan="1">
              Reception - 🍺 🍷
            </td>
          </tr>
          <tr>
            <th>6:30</th>
            <td colspan="4" rowspan="4">
              Seated Dinner - 🍽️ 🍗
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
              Dancing - 🕺🏽 💃
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
                Go To Sleep - 🏠 🛌
              </span>
            </td>
          </tr>
          <tr>
            <th>11:30</th>
            <td colspan="4" rowspan="2" class="blue">
              After Party - 💃 🍺
            </td>
          </tr>
          <tr>
            <th>???</th>
          </tr>
        </table>
      </Fade>
    </div>
  );
};

export default Schedule;
