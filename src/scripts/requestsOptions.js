const { tmdbKey, omdbKey } = require("./apiKeys");

const requestsBaseOptions = {
  headers: {
    "User-Agent": "Request-Promise"
  },
  json: true
};
const tmdbApiKey = {
  api_key: tmdbKey
};
const omdbApiKey = {
  apikey: omdbKey
};

module.exports = {
  requestsBaseOptions,
  tmdbApiKey,
  omdbApiKey
};
