import React from "react";
import "./Genres.css";

const Genres = ({ genres }) => {
  return genres.map(genre => <p className="Genres-genrePill">{genre.name}</p>);
};

export default Genres;
