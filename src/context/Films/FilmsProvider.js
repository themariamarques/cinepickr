import FilmsContext from "./FilmsContext";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import searchFilm from "../../services/searchFilm";
import fetchFilmsInPortugal from "../../services/fetchFilmsInPortugal";
import fetchFilmsInPortugalMock from "../../mocks/fetchFilmsInPortugalMock";
import fetchFilmDetails from "../../services/fetchFilmDetails";

const FilmsProvider = ({ children }) => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    fetchFilmsInPortugal()
      .then(filmsInPortugal => {
        filmsInPortugal.map(film => {
          if (!film.originalTitle && !film.portugueseTitle) {
            return null;
          }
          const title = film.originalTitle || film.portugueseTitle;
          const year = film.year;

          searchFilm(title, year)
            .then(film => {
              if (!film || !film.id) {
                return null;
              }

              fetchFilmDetails(film.id).then(responseFilmDetails =>
                setFilms(prevFilms => [...prevFilms, responseFilmDetails])
              );
            })
            .catch(() => setHasFailed(true));
        });
      })
      .then(() => setIsLoading(false))
      .catch(() => setHasFailed(true));
  }, []);

  return (
    <FilmsContext.Provider
      value={{
        films,
        isLoading,
        hasFailed
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

FilmsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FilmsProvider;
