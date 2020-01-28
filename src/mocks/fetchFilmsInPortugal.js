import { mockFilmspot } from "./mockFilmspot";
const cheerio = require("cheerio");

const fetchFilmsInPortugalMock = () => {
  const films = [];

  return new Promise((resolve, reject) => {
    const $ = cheerio.load(mockFilmspot);
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

    setTimeout(() => {
      resolve(films);
    }, 500);
  });
};

export default fetchFilmsInPortugalMock;
