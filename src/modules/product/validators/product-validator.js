const { isURL } = require("validator");

function validateProduct(data) {
  if (!data.title || typeof data.title !== "string") throw new Error("INVALID TITLE");
  if (!data.author || typeof data.author !== "string") throw new Error("INVALID AUTHOR");
  if (!data.publish_year || typeof data.publish_year !== "number") throw new Error("INVALID PUBLISH_YEAR");
  if (!data.price || typeof data.price !== "number") throw new Error("INVALID PRICE");
  if (!data.cover_url || !isURL(data.cover_url)) throw new Error("INVALID COVER_URL");
}

module.exports = { validateProduct };
