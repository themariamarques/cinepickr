import React from "react";
import "./Poster.css";

const Poster = ({ film }) => {
  const { poster_path: path } = film;
  const basePath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  return (
    <img
      className="Poster-img"
      width="175"
      height="262.5"
      src={`${basePath}${path}`}
    />
  );
};

export default Poster;
