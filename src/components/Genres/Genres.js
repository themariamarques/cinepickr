import React from "react";
import Styles from "./Genres.module.css";
import cx from "classnames";

const Genres = ({ genres }) => {
  const isLongList = genres.length > 3;

  return (
    <div className={cx(Styles.container, { [Styles.isLongList]: isLongList })}>
      {genres.map((genre, index) => (
        <p className={Styles.pill} key={index}>
          {genre.name}
        </p>
      ))}
    </div>
  );
};

export default Genres;
