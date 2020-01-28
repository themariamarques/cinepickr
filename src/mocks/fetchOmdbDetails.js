const fetchOmdbDetailsMock = id => {
  return new Promise((resolve, reject) => {
    const Ratings = [
      { Source: "Internet Movie Database", Value: "7/10" },
      { Source: "Rotten Tomatoes", Value: "99%" },
      { Source: "Metacritic", Value: "94/100" }
    ];

    setTimeout(() => {
      resolve({ Ratings, imdbRating: "7" });
    }, 200);
  });
};

export default fetchOmdbDetailsMock;
