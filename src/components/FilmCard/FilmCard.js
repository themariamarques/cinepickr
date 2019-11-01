import React from "react";
import Poster from "../Poster";
import FilmCarInfo from "../FilmCarInfo";
import Styles from "./FilmCard.module.css";
import LazyLoad from "react-lazy-load";

const FilmCard = ({ film, index }) => {
  if (!film) {
    return null;
  }

  return (
    <LazyLoad offsetVertical={500} debounce={false}>
      <div className={Styles.card} key={index} id={film.id}>
        <Poster film={film} />
        <FilmCarInfo film={film} />
      </div>
    </LazyLoad>
  );
};

export default FilmCard;
