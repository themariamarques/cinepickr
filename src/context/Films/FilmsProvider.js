import FilmsContext from "./FilmsContext";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import searchFilm from "../../services/searchFilm";
import fetchFilmsInPortugal from "../../services/fetchFilmsInPortugal";
import fetchFilmsInPortugalMock from "../../mocks/fetchFilmsInPortugalMock";
import fetchFilmDetails from "../../services/fetchFilmDetails";
import { chunkArray } from "../../utils/chunkArray";

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
    const film = await searchFilm(title, year);

    if (!film || !film.id) {
      return null;
    }

    const filmWithMoreDetails = await fetchFilmDetails(film.id);

    return filmWithMoreDetails;
  };

  const sortByVote = () => {
    const sortedFilmsByVote = films.sort((a, b) => {
      if (!a || !b || !a.vote_average || !b.vote_average) {
        return 0;
      }

      return b.vote_average - a.vote_average;
    });

    setFilms([...sortedFilmsByVote]);
  };

  const sortByPopularity = () => {
    const sortedFilmsByPopularity = films.sort((a, b) => {
      if (!a || !b || !a.popularity || !b.popularity) {
        return 0;
      }

      return b.popularity - a.popularity;
    });

    setFilms([...sortedFilmsByPopularity]);
  };

  return (
    <FilmsContext.Provider
      value={{
        films,
        hasFailed,
        isLoading,
        sortByPopularity,
        sortByVote
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
