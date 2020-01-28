import axios from "axios";

const fetchTmdbDetails = id => {
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=5ff9d599387c430f4717295513e8bae8&append_to_response=videos,credits,translations`;

  return axios.get(api).then(response => {
    return response.data;
  });
};

export default fetchTmdbDetails;
