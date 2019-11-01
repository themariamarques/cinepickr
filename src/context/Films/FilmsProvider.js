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

  useEffect(() => {
    fetchFilmsInPortugal().then(filmsInPortugal => {
      filmsInPortugal.map(film => {
        if (!film.originalTitle && !film.portugueseTitle) {
          return null;
        }
        const title = film.originalTitle || film.portugueseTitle;
        const year = film.year;

        searchFilm(title, year).then(({ id }) => {
          if (!id) {
            return null;
          }

          fetchFilmDetails(id).then(responseFilmDetails =>
            setFilms(prevFilms => [...prevFilms, responseFilmDetails])
          );
        });
      });

      setIsLoading(false);
    });
  }, []);

  return (
    <FilmsContext.Provider
      value={{
        films,
        isLoading
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
