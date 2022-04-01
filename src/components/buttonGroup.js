import React from "react";
import "./buttonGroup.css";

const ButtonGroup = ({ buttons, value, onClick, guestID }) => {
  const handleClick = (event, id) => {
    onClick(event);
  };

  return (
    <>
      {buttons.map((buttonData, i) => (
        <div
          className={
            buttonData.value === value ? "button-group checked" : "button-group"
          }
          key={i}
        >
          <input
            type="radio"
            name="select"
            id={`${guestID}-${buttonData.label}`}
            checked={buttonData.value === value}
            onChange={(event) => handleClick(event, i)}
            value={buttonData.value}
          />
          <label htmlFor={`${guestID}-${buttonData.label}`} className="option">
            <div className="dot"></div>
            <span>{buttonData.label}</span>
          </label>
        </div>
      ))}
    </>
  );
};

export default ButtonGroup;
