import React from "react";
import Genres from "../Genres";
import Styles from "./FilmCarInfo.module.css";

const FilmCarInfo = ({ film }) => {
  const { credits, genres, original_title: title, release_date: date } = film;
  const { crew } = credits;

  return (
    <div className={Styles.container}>
      {title && <h2 className={Styles.title}>{title}</h2>}
      <div className={Styles.directorsAndYear}>
        {crew && <p className={Styles.directors}>{extractDirectors(crew)}</p>}
        {date && <p className={Styles.year}>({extractYear(date)})</p>}
      </div>
      {genres && <Genres genres={genres} />}
    </div>
  );
};

const extractDirectors = crew => {
  const directors = [];

  crew.forEach(entry => {
    if (entry.job === "Director") {
      directors.push(entry.name);
    }
  });

  return directors.join(", ");
};

const extractYear = date => {
  return date.split("-")[0];
};

export default FilmCarInfo;
