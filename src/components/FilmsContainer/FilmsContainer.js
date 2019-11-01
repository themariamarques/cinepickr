import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import FilmsList from "../FilmsList";
import Loader from "../Loader";
import "./FilmsContainer.css";

const FilmsContainer = () => {
  const { films, isLoading } = useContext(FilmsContext);

  return (
    <div className="FilmsContainer-container">
      {isLoading ? <Loader /> : <FilmsList films={films} />}
    </div>
  );
};

export default FilmsContainer;
