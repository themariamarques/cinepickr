const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrapeLetterboxd = async id => {
  const browser = await puppeteer.launch();

  let rating = null;
  try {
    const page = await browser.newPage();
    await page.goto(`https://letterboxd.com/tmdb/${id}`);

    let content = await page.content();
    var $ = cheerio.load(content);

    rating = $("span.average-rating > a").text();
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log(`FINISHED SCRAPING LETTERBOXD FOR ID: ${id}`);

    browser.close();
    return rating;
  }
};

module.exports = scrapeLetterboxd;
