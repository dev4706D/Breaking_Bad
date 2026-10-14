import React from "react";
import spinner from "../../img/spinner.gif";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img
        src={spinner}
        alt="Loading characters..."
        className="spinner-image"
      />
      <p className="spinner-text">Synthesizing character database...</p>
    </div>
  );
};

export default Spinner;
