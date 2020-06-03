const rp = require("request-promise");
const { requestsBaseOptions, omdbApiKey } = require("./requestsOptions");

const fetchOmdbDetails = async id => {
  const options = {
    uri: `https://www.omdbapi.com/`,
    ...requestsBaseOptions,
    qs: {
      i: id,
      ...omdbApiKey
    }
  };

  try {
    response = await rp(options);

    return response;
  } catch (err) {
    console.error("error in fetching omdb details: ", err);
  }
};

module.exports = fetchOmdbDetails;
