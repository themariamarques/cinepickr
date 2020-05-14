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
