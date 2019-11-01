import React from "react";
import FilmCard from "../FilmCard";
import "./FilmsList.css";

const FilmsList = ({ films }) => {
  return (
    <div className="FilmsList-container">
      {films.map((film, index) => {
        return <FilmCard film={film} index={index} />;
      })}
    </div>
  );
};

export default FilmsList;
