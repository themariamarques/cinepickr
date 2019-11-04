import React from "react";
import Poster from "../Poster";
import FilmCardInfo from "../FilmCardInfo";
import Styles from "./FilmCard.module.css";
import LazyLoad from "react-lazy-load";

const FilmCard = ({ film }) => {
  if (!film) {
    return null;
  }

  return (
    <LazyLoad offsetVertical={500} debounce={false}>
      <div className={Styles.card} key={film.id}>
        <Poster film={film} />
        <FilmCardInfo film={film} />
      </div>
    </LazyLoad>
  );
};

export default FilmCard;
