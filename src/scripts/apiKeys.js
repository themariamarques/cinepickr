const TMBD_API_KEY = "123";
const OMDB_API_KEY = "123";

module.exports = {
  tmdbKey: process.env.TMBD_API_KEY || TMBD_API_KEY,
  omdbKey: process.env.OMDB_API_KEY || OMDB_API_KEY,
};
