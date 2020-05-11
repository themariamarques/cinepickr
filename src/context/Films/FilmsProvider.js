import FilmsContext from "./FilmsContext";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import fetchFilmInTmdb from "../../services/fetchFilmInTmdb";
import fetchFilmsInPortugal from "../../services/fetchFilmsInPortugal";
// import fetchFilmsInPortugal from "../../mocks/fetchFilmsInPortugal";
import fetchTmdbDetails from "../../services/fetchTmdbDetails";
import fetchOmdbDetails from "../../services/fetchOmdbDetails";
// import fetchOmdbDetails from "../../mocks/fetchOmdbDetails";

const FilmsProvider = ({ children }) => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    async function fetchFilms() {
      try {
        setFilms(await getFilms());
      } catch (e) {
        setHasFailed(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilms();
  }, []);

  const getFilms = async () => {
    const filmsFromPortugal = await fetchFilmsInPortugal();
    const filmsWithMoreInfo = await fetchMoreInfoFromTmdb(filmsFromPortugal);

    return filmsWithMoreInfo;
  };

  const fetchMoreInfoFromTmdb = async films => {
    return Promise.all(
      films.map(async film => {
        if (!film.originalTitle && !film.portugueseTitle) {
          return null;
        }

        const title = film.originalTitle || film.portugueseTitle;
        const year = film.year;

        return await searchForFilmInTmdb(title, year);
      })
    );
  };

  const searchForFilmInTmdb = async (title, year) => {
    const film = await fetchFilmInTmdb(title, year);

    if (!film || !film.id) {
      return null;
    }

    const filmWithMoreDetails = await fetchTmdbDetails(film.id);
    const filmOmdbDetails = await fetchOmdbDetails(filmWithMoreDetails.imdb_id);

    return {
      ...filmWithMoreDetails,
      imdbRating: filmOmdbDetails.imdbRating,
      omdbRatings: filmOmdbDetails.Ratings
    };
  };

  const sortBy = field => {
    const sortedFilms = films.sort((a, b) => {
      if (!a || !b || !a[field] || !b[field]) {
        return 0;
      }

      if (isNaN(a[field])) {
        return 1;
      }

      if (isNaN(b[field])) {
        return -1;
      }

      return b[field] - a[field];
    });

    setFilms([...sortedFilms]);
  };

  return (
    <FilmsContext.Provider
      value={{
        films,
        hasFailed,
        isLoading,
        sortBy
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
