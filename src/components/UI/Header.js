import React from "react";
import logo from "../../img/logo.png";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-wrapper">
        <img src={logo} alt="Breaking Bad Logo" className="header-logo" />
      </div>
      <div className="header-subtitle">
        <span className="element-badge">Br</span>eaking{" "}
        <span className="element-badge">Ba</span>d &amp; Better Call Saul Archive
      </div>
    </header>
  );
};

export default Header;
