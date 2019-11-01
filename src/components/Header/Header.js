import React from "react";
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={Styles.container}>
      <div className={Styles.content}>
        <h1 className={Styles.title}>Cinepickr</h1>
        <p className={Styles.subtitle}>pick the movie for you</p>
      </div>
    </header>
  );
};

export default Header;
