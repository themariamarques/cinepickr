import axios from "axios";
import fetchFilmInTmdb from "./fetchFilmInTmdb";

const fetchTmdbCover = async film => {
  const api = `https://api.themoviedb.org/3/movie/${film.id}?api_key=5ff9d599387c430f4717295513e8bae8`;

  return axios.get(api).then(response => {
    return response.data;
  });
};

export default fetchTmdbCover;
