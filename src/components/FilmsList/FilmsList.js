import React from "react";
import FilmCard from "../FilmCard";
import Styles from "./FilmsList.module.css";

const FilmsList = ({ films, fetchMoreFilms, showLoadMore }) => {
  return (
    <div className={Styles.container}>
      {films.map((film, index) => {
        return <FilmCard key={index} film={film} />;
      })}
      {showLoadMore && (
        <button onClick={() => fetchMoreFilms()}>Fetch for more</button>
      )}
    </div>
  );
};

export default FilmsList;
