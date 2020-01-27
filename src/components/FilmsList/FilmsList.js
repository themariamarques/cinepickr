import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import FilmCard from "../FilmCard";
import FilmsSorter from "../FilmsSorter";
import Styles from "./FilmsList.module.css";

const FilmsList = () => {
  const { films } = useContext(FilmsContext);

  return (
    <div className={Styles.container}>
      <FilmsSorter />
      <div className={Styles.content}>
        {films.map((film, index) => (
          <FilmCard key={index} film={film} />
        ))}
      </div>
    </div>
  );
};

export default FilmsList;
