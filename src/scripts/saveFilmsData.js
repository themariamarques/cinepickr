const filmsInPortugal = require("../data/filmsInPortugal.json");
const letterboxdRatings = require("../data/letterboxdRatings.json");

const jsonfile = require("jsonfile");

const { fetchFilmInTmdb, fetchTmdbDetails } = require("./tmdbApi.js");
const fetchOmdbDetails = require("./omdbApi.js");
const scrapeLetterboxd = require("./scrapeLetterboxd.js");

const saveFilmsData = async () => {
  const filmsFullDetail = await fetchMoreInfoFromTmdb(filmsInPortugal);
  const filterOutResults = filmsFullDetail.filter((item) => !!item);

  const letterboxdRatings = await scrapeLetterboxd(filmsFullDetail);

  const mergeWithLetterboxdRating = filterOutResults.map((film) => {
    const letterboxdRating = letterboxdRatings.find(
      (f) => f.id === film.id
    )?.rating;

    return {
      ...film,
      ...(letterboxdRating && { letterboxdRating }),
    };
  });

  jsonfile.writeFile(
    "./src/data/letterboxdRatings.json",
    letterboxdRatings,
    { spaces: 2 },
    (err) => {
      err && console.error(`error in saving letterboxdRatings: ${err}`);
    }
  );
  jsonfile.writeFile(
    "./src/data/filmsFullDetail.json",
    mergeWithLetterboxdRating,
    { spaces: 2 },
    (err) => {
      err && console.error(`error in saving filmsFullDetail: ${err}`);
    }
  );
};

const fetchMoreInfoFromTmdb = async (films) => {
  return Promise.all(
    films.map(async (film) => {
      if (!film.originalTitle && !film.portugueseTitle) {
        return null;
      }

      const title = film.originalTitle || film.portugueseTitle;
      const year = film.year;
      const lang = film.originalTitle ? "en-US" : "pt-PT";

      return await fetchMoreDetails(title, year, lang);
    })
  );
};

const fetchMoreDetails = async (title, year, lang) => {
  const response = await fetchFilmInTmdb(title, year, lang);

  if (response.results.length === 0) {
    return null;
  }

  const film = response.results[0];

  if (!film || !film.id) {
    return null;
  }

  const filmWithMoreDetails = await fetchTmdbDetails(film.id);

  const filmHasImdbId = filmWithMoreDetails.imdb_id;
  let filmOmdbDetails = null;

  if (filmHasImdbId) {
    filmOmdbDetails = await fetchOmdbDetails(filmWithMoreDetails.imdb_id);
  }

  return {
    ...filmWithMoreDetails,
    ...(filmHasImdbId && {
      imdbRating: filmOmdbDetails.imdbRating,
      omdbRatings: filmOmdbDetails.Ratings,
    }),
  };
};

module.exports.init = saveFilmsData();
