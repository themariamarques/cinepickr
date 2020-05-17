import FilmsContext from "./FilmsContext";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import filmsFullDetail from "../../data/filmsFullDetail.json";

const FilmsProvider = ({ children }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setFilms(filmsFullDetail);
    return () => null;
  }, []);

  const sortBy = source => {
    const sortedFilms = films.sort((filmA, filmB) => {
      const { omdbRatings: omdbRatingsA } = filmA;
      const { omdbRatings: omdbRatingsB } = filmB;

      const findSourceA = omdbRatingsA.find(
        ratingSource => ratingSource.Source === source
      );
      const findSourceB = omdbRatingsB.find(
        ratingSource => ratingSource.Source === source
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
    });

    setFilms([...sortedFilms]);
  };

  return (
    <FilmsContext.Provider
      value={{
        films,
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
