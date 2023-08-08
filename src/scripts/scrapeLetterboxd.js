const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const IS_MOCK = false;
const mockHtml = require("../mocks/mockLetterboxd");

const scrapeLetterboxd = async (films) => {
  const browser = await puppeteer.launch();

  const filmsWithId = films.filter((films) => !!films.id);

  let ratings = [];

  const getRating = async (id) => {
    console.log(`🤖 Opening page for film ${id} 📽`);

    const page = await browser.newPage();
    await page.goto(`https://letterboxd.com/tmdb/${id}`, {
      waitUntil: "load",
      timeout: 0,
    });

    let content = await page.content();
    var $ = cheerio.load(IS_MOCK ? mockHtml : content);

    const metaRating = $('[name="twitter:data2"]')
      ?.attr("content")
      ?.split(" out")[0];
    const ratingLabel = $("span.average-rating > a").text();

    const rating = metaRating || ratingLabel;

    ratings.push({ id, rating });
    console.log(
      rating
        ? `🤖 Rating crawled for film id ${id}: ${rating}⭐ `
        : `🤖 No rating found for film id ${id}`
    );

    Promise.resolve(rating);
  };

  await Promise.all(
    filmsWithId?.map(async ({ id }) => {
      return await getRating(id);
    })
  );

  browser.close();

  return ratings;
};

module.exports = scrapeLetterboxd;
