const rp = require("request-promise");
const cheerio = require("cheerio");
const URL = "https://cors-anywhere.herokuapp.com/https://filmspot.pt/filmes/";

const fetchFilmsInPortugal = () => {
  const films = [];

  return rp(URL)
    .then(html => {
      const $ = cheerio.load(html);
      const filmsList = $(".filmeLista");

      filmsList.each((index, element) => {
        const film = {
          portugueseTitle: $(element)
            .find(".filmeListaInfo > h2 > a > span:nth-child(1)")
            .text(),
          originalTitle: $(element)
            .find("span.tituloOriginal > span:nth-child(1)")
            .text(),
          year: $(element)
            .find(".filmeListaInfo p")
            .text()
            .trim()
            .split(" ")[0]
        };

        films.push(film);
      });

      return films;
    })
    .catch(() => {
      return films;
    });
};

export default fetchFilmsInPortugal;
