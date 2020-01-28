import axios from "axios";

const fetchOmdbDetails = id => {
  const api = `https://www.omdbapi.com/?i=${id}&apikey=61607aab`;

  return axios.get(api).then(response => {
    return response.data;
  });
};

export default fetchOmdbDetails;
