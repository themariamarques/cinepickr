import FilmsContext from "./FilmsContext";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import searchFilm from "../../services/searchFilm";
import fetchFilmsInPortugal from "../../services/fetchFilmsInPortugal";
import fetchFilmsInPortugalMock from "../../mocks/fetchFilmsInPortugalMock";
import fetchFilmDetails from "../../services/fetchFilmDetails";
import { chunkArray } from "../../utils/chunkArray";

const FilmsProvider = ({ children }) => {
  const [chunks, setChunks] = useState([]);
  const [lastLoadedChunk, setLastLoadedChunk] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    async function fetchFilms() {
      try {
        setFilms(await getFilms());
        showLoadMoreBtnAfterTimeout();
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

    const chunkSize = 8;
    const chunkedArray = chunkArray(filmsFromPortugal, chunkSize);

    setChunks(chunkedArray);
    setLastLoadedChunk(0);

    const filmsWithMoreInfo = await fetchMoreInfoOfChunk(chunkedArray[0]);

    return filmsWithMoreInfo;
  };

  const fetchMoreInfoOfChunk = async films => {
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

  const fetchMoreFilms = async () => {
    const isPenultimateChunk = chunks.length - lastLoadedChunk === 2;
    const nextChunkIndex = lastLoadedChunk + 1;

    setShowLoadMore(false);

    const nextChunk = await fetchMoreInfoOfChunk(chunks[nextChunkIndex]);

    setLastLoadedChunk(nextChunkIndex);
    setFilms(prevFilms => prevFilms.concat(nextChunk));

    if (!isPenultimateChunk) {
      showLoadMoreBtnAfterTimeout();
    }
  };

  const showLoadMoreBtnAfterTimeout = () => {
    setTimeout(() => {
      setShowLoadMore(true);
    }, 1000);
  };

  return (
    <FilmsContext.Provider
      value={{
        films,
        isLoading,
        hasFailed,
        fetchMoreFilms,
        showLoadMore
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
