const backdropFilmsList = require("../data/backdropFilmsList.json");

const jsonfile = require("jsonfile");

const { fetchTmdbDetails } = require("./tmdbApi.js");

const saveBackdropData = async () => {
  const filmsList = await fetchMoreInfoFromTmdb();

  jsonfile.writeFile(
    "./src/data/backdropFilmsListWithDetails.json",
    filmsList,
    { spaces: 2 },
    err => {
      console.error("error ", err);
    }
  );
};

const fetchMoreInfoFromTmdb = async () => {
  return Promise.all(
    backdropFilmsList.map(async film => {
      if (!film.id) {
        return null;
      }

      const filmWithDetails = await fetchTmdbDetails(film.id);

      return {
        id: filmWithDetails.id,
        backdrop_path: filmWithDetails.backdrop_path
      };
    })
  );
};

module.exports.init = saveBackdropData();
