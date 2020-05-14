import React from "react";
import FilmsList from "../FilmsList";
import Styles from "./FilmsContainer.module.css";

const FilmsContainer = () => (
  <div className={Styles.container}>
    <FilmsList />
  </div>
);

export default FilmsContainer;
