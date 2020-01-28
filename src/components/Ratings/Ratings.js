import React from "react";
import Styles from "./Ratings.module.scss";

const Ratings = ({ film }) => {
  const { imdbRating, imdb_id } = film;

  if (!imdbRating) {
    return null;
  }
  const Component = imdb_id ? "a" : "div";
  const href = `https://www.imdb.com/title/${imdb_id}`;

  return (
    <Component
      className={Styles.container}
      {...(href && { href, target: "_blank" })}
    >
      {imdbRating}
    </Component>
  );
};

export default Ratings;
