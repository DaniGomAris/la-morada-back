const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  youtubeId: { type: String, required: true },
  creator_id: { type: String, ref: "User", required: true },
  creator_name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Podcast", podcastSchema);
