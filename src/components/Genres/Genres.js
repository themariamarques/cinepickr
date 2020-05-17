import React from "react";
import Styles from "./Genres.module.css";

const Genres = ({ genres }) => {
  return (
    <div className={Styles.container}>
      <p className={Styles.genre}>
        {genres.map((genre, index) => {
          const isLastElement = index === genres.length - 1;

          return `${genre.name}${!isLastElement ? " / " : ""}`;
        })}
      </p>
    </div>
  );
};

export default Genres;
