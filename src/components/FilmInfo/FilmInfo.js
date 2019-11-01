import React from "react";
import Genres from "../Genres";
import "./FilmInfo.css";

const FilmInfo = ({ film }) => {
  const { credits, genres, original_title: title, release_date: date } = film;

  return (
    <div className="FilmInfo-container">
      {title && (
        <h2 className="FilmInfo-titleContainer">
          <span className="FilmInfo-title">{title}</span>
          {date && <p className="FilmInfo-year">({extractYear(date)})</p>}
        </h2>
      )}
      {credits && (
        <p className="FilmInfo-directors">{extractDirectors(credits)}</p>
      )}
      {genres && <Genres genres={genres} />}
    </div>
  );
};

const extractDirectors = credits => {
  const directors = [];

  credits.crew &&
    credits.crew.forEach(entry => {
      if (entry.job === "Director") {
        directors.push(entry.name);
      }
    });

  return directors.join(", ");
};

const extractYear = date => {
  return date.split("-")[0];
};

export default FilmInfo;
