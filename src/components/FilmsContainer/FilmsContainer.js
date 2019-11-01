import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import FilmsList from "../FilmsList";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import Styles from "./FilmsContainer.module.css";

const FilmsContainer = () => {
  const { films, isLoading, hasFailed } = useContext(FilmsContext);

  return (
    <div className={Styles.container}>
      {renderContent(films, isLoading, hasFailed)}
    </div>
  );
};

const renderContent = (films, isLoading, hasFailed) => {
  if (hasFailed) {
    return <ErrorMessage />;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <FilmsList isLoading={isLoading} films={films} />
  );
};

export default FilmsContainer;
