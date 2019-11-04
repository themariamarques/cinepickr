import React from "react";
import FilmCard from "../FilmCard";
import Styles from "./FilmsList.module.css";

const FilmsList = ({ films, fetchMoreFilms, showLoadMore }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.filmsContainer}>
        {films.map((film, index) => {
          return <FilmCard key={index} film={film} />;
        })}
      </div>
      {showLoadMore && (
        <button onClick={() => fetchMoreFilms()} className={Styles.loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default FilmsList;
