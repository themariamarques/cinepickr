import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="Loader-container">
      <svg
        className="Loader-svg"
        version="1.1"
        id="L4"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 52 100"
        enableBackground="new 0 0 0 0"
      >
        <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"
          ></animate>
        </circle>
        <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"
          ></animate>
        </circle>
        <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"
          ></animate>
        </circle>
      </svg>
      <p className="Loader-message">(fetching some life changing data)</p>
    </div>
  );
};

export default Loader;
