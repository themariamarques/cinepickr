import FilmsContext from "./FilmsContext";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import filmsFullDetail from "../../data/filmsFullDetail.json";

const FilmsProvider = ({ children }) => {
  const [films, setFilms] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);

  const setGenresToSelect = films => {
    let availableGenresIds = [];

    films.map(film => {
      film.genres.map(genre => {
        if (availableGenresIds.includes(genre.id)) {
          return null;
        }

        availableGenresIds.push(genre.id);
      });
    });

    setAvailableGenres(availableGenresIds);
  };

  useEffect(() => {
    setFilms(filmsFullDetail);
    setGenresToSelect(filmsFullDetail);
    return () => null;
  }, []);

  const filterByGenre = genres => {
    const filteredList = filmsFullDetail.filter(film => {
      let shouldIncludeFilmInFilteredList = true;
      genres.map(genre => {
        if (!film.genres.some(el => el.name === genre)) {
          shouldIncludeFilmInFilteredList = false;
        }
      });
      return shouldIncludeFilmInFilteredList;
    });

    setFilms(filteredList);
    setGenresToSelect(filteredList);
  };

  const sortBy = value => {
    const sortedFilms = films.sort((filmA, filmB) => {
      if (value === "shortruntime" || value === "longruntime") {
        return sortByRuntime(value, filmA, filmB);
      }

      if (value === "letterboxd") {
        return sortByLetterboxdRating(filmA, filmB);
      }

      return sortByRatingSource(value, filmA, filmB);
    });

    setFilms([...sortedFilms]);
  };

  const sortByLetterboxdRating = (filmA, filmB) => {
    if (filmA.letterboxdRating === "") {
      return 1;
    }

    if (filmB.letterboxdRating === "") {
      return -1;
    }

    return filmB.letterboxdRating - filmA.letterboxdRating;
  };

  const sortByRatingSource = (value, filmA, filmB) => {
    const { omdbRatings: omdbRatingsA } = filmA;
    const { omdbRatings: omdbRatingsB } = filmB;

    const findSourceA = omdbRatingsA.find(
      ratingSource => ratingSource.Source === value
    );
    const findSourceB = omdbRatingsB.find(
      ratingSource => ratingSource.Source === value
    );

    if (!omdbRatingsA || !omdbRatingsB) {
      return 0;
    }

    const normalizeValue = ratingSource => {
      if (ratingSource.Source === "Internet Movie Database") {
        return ratingSource.Value.split("/")[0];
      }

      if (ratingSource.Source === "Rotten Tomatoes") {
        return ratingSource.Value.split("%")[0];
      }

      if (ratingSource.Source === "Metacritic") {
        return ratingSource.Value.split("/")[0];
      }

      return false;
    };

    if (!findSourceA) {
      return 1;
    }

    if (!findSourceB) {
      return -1;
    }

    const valueA = normalizeValue(findSourceA);
    const valueB = normalizeValue(findSourceB);

    return valueB - valueA;
  };

  const sortByRuntime = (value, filmA, filmB) => {
    if (value === "shortruntime") {
      if (filmA.runtime === 0) {
        return 1;
      }

      if (filmB.runtime === 0) {
        return -1;
      }

      return filmA.runtime - filmB.runtime;
    }

    return filmB.runtime - filmA.runtime;
  };

  return (
    <FilmsContext.Provider
      value={{
        availableGenres,
        films,
        filterByGenre,
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
