import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import FilmCard from "../FilmCard";
import GenreFilter from "../GenreFilter";
import RatingsSorter from "../RatingsSorter";
import Styles from "./FilmsList.module.css";

const FilmsList = () => {
  const { films } = useContext(FilmsContext);

  return (
    <div className={Styles.container}>
      <div className={Styles.topFilters}>
        <GenreFilter />
        <RatingsSorter />
      </div>
      <div className={Styles.content}>
        {films.map(film => (
          <FilmCard key={`list_film_${film.id}`} film={film} />
        ))}
      </div>
    </div>
  );
};

export default FilmsList;
