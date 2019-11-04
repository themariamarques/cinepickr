import axios from "axios";

const searchFilm = (title, year = "") => {
  const api =
    "https://api.themoviedb.org/3/search/movie?api_key=5ff9d599387c430f4717295513e8bae8&language=pt-PT&query=";
  const movieTitleEncoded = encodeURI(title);
  const yearQuery = year ? `&year=${year}` : "";

  return axios.get(`${api}${movieTitleEncoded}${yearQuery}`).then(response => {
    return response.data.results[0];
  });
};

export default searchFilm;
