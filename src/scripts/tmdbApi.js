const rp = require("request-promise");
const { requestsBaseOptions, tmdbApiKey } = require("./requestsOptions");

const BASE_PATH = "https://api.themoviedb.org/3/";

const fetchFilmInTmdb = async (title, year = "", lang) => {
  const options = {
    uri: `${BASE_PATH}search/movie`,
    ...requestsBaseOptions,
    qs: {
      ...tmdbApiKey,
      language: lang,
      query: title,
      year: year
    }
  };

  try {
    response = await rp(options);

    return response;
  } catch (err) {
    console.error("error ", err);
  }
};

const fetchTmdbDetails = async id => {
  const options = {
    uri: `${BASE_PATH}movie/${id}`,
    ...requestsBaseOptions,
    qs: {
      ...tmdbApiKey,
      append_to_response: "videos,credits,translations"
    }
  };

  try {
    response = await rp(options);

    return response;
  } catch (err) {
    console.error("error ", err);
  }
};

module.exports = {
  fetchFilmInTmdb,
  fetchTmdbDetails
};
