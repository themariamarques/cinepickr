const IS_MOCK = true;
const mockHtml = require("../mocks/mockFilmspot");

const request = require("request");
const cheerio = require("cheerio");
const jsonfile = require("jsonfile");

request("https://filmspot.pt/filmes/", function(error, response, html) {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(IS_MOCK ? mockHtml : html);

    const films = [];
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

    jsonfile.writeFile(
      "./src/data/filmsInPortugal.json",
      films,
      { spaces: 2 },
      err => {
        console.error("error ", err);
      }
    );
  } else {
    console.log("status code: ", response.statusCode, "error: ", error);
  }
});
