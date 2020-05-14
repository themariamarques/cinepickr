import React from "react";
import Poster from "../Poster";
import Ratings from "../Ratings";
import FilmCardInfo from "../FilmCardInfo";
import Styles from "./FilmCard.module.css";

const FilmCard = ({ film }) => {
  if (!film) {
    return null;
  }

  return (
    <div className={Styles.card} key={film.id}>
      <Poster film={film} />
      <Ratings film={film} />
      <FilmCardInfo film={film} />
    </div>
  );
};

export default FilmCard;
