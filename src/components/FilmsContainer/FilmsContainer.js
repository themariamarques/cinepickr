import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import FilmsList from "../FilmsList";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import Styles from "./FilmsContainer.module.css";

const FilmsContainer = () => {
  const {
    films,
    isLoading,
    hasFailed,
    fetchMoreFilms,
    showLoadMore
  } = useContext(FilmsContext);

  const renderContent = () => {
    if (hasFailed) {
      return <ErrorMessage />;
    }

    return isLoading ? (
      <Loader />
    ) : (
      <FilmsList
        showLoadMore={showLoadMore}
        isLoading={isLoading}
        films={films}
        fetchMoreFilms={fetchMoreFilms}
      />
    );
  };

  return (
    <div className={Styles.container}>
      {renderContent(films, isLoading, hasFailed)}
    </div>
  );
};

export default FilmsContainer;
