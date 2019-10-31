const rp = require('request-promise');
const cheerio = require('cheerio');
const URL = 'https://cors-anywhere.herokuapp.com/https://filmspot.pt/filmes/';

const fetchFilmsInPortugal = () => {
    const films = [];

    return rp(URL)
      .then((html) => {
        const $ = cheerio.load(html);
        const originalTitles = $('span.tituloOriginal').find('span:nth-child(1)');

        originalTitles.each((index, element) => {
            films.push($(element).text())
        });

        return films;
      }).catch(() => {
        return films;
      });
}

export default fetchFilmsInPortugal;