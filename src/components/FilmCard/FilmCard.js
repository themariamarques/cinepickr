import React from "react";
import Poster from "../Poster";
import FilmInfo from "../FilmInfo";
import "./FilmCard.css";

const FilmCard = ({ film, index }) => {
  if (!film) {
    return null;
  }

  return (
    <div className="FilmCard-card" key={index}>
      <Poster film={film} />
      <FilmInfo film={film} />
    </div>
  );
};

export default FilmCard;
