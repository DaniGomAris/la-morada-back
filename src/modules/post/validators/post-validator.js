const mongoose = require("mongoose");

function validatePost(data) {
  if (!data.title || typeof data.title !== "string") {
    throw new Error("INVALID TITLE");
  }

  if (!data.content || typeof data.content !== "string") {
    throw new Error("INVALID CONTENT");
  }

  if (data.active !== undefined && typeof data.active !== "boolean") {
    throw new Error("INVALID ACTIVE");
  }

  if (data.post_id && !mongoose.Types.ObjectId.isValid(data.post_id)) {
    throw new Error("INVALID ID");
  }
}

module.exports = { validatePost };
