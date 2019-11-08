import { isMobileDevice } from "../utils/deviceDetection";
const rp = require("request-promise");
const cheerio = require("cheerio");
const URL = "https://cors-anywhere.herokuapp.com/https://filmspot.pt/filmes/";

const fetchFilmsInPortugal = () => {
  return rp(URL)
    .then(html => {
      const $ = cheerio.load(html);

      return isMobileDevice ? crawlForMobile($) : crawlForDesktop($);
    })
    .catch(err => {
      console.error(err);
    });
};

const crawlForMobile = $ => {
  const patternToEscape = /\((.*?)\)/g;
  const films = [];
  const filmsList = $(".filmeLista");

  filmsList.each((index, element) => {
    const alt = $(element)
      .find(".shadow")
      .attr("alt");
    const altSplit = alt.split(" / ");
    const originalAndYear =
      altSplit.length > 1
        ? altSplit[1].split(patternToEscape)
        : altSplit[0].split(patternToEscape);

    const film = {
      portugueseTitle: altSplit[0],
      originalTitle: originalAndYear[0],
      year: originalAndYear[1]
    };

    films.push(film);
  });

  return films;
};

const crawlForDesktop = $ => {
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

  return films;
};

export default fetchFilmsInPortugal;
