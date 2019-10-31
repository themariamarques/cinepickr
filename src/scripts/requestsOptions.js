const TMBD_API_KEY = "123";
const OMDB_API_KEY = "123";

const requestsBaseOptions = {
  headers: {
    "User-Agent": "Request-Promise"
  },
  json: true
};
const tmdbApiKey = {
  api_key: TMBD_API_KEY
};
const omdbApiKey = {
  apikey: OMDB_API_KEY
};

module.exports = {
  requestsBaseOptions,
  tmdbApiKey,
  omdbApiKey
};
