import React from "react";
import FilmCard from "../FilmCard";
import Styles from "./FilmsList.module.css";

const FilmsList = ({ films, isLoading }) => {
  return (
    <div className={Styles.container}>
      {films.map((film, index) => {
        return <FilmCard film={film} index={index} />;
      })}
    </div>
  );
};

export default FilmsList;
