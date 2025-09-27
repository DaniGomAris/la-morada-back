const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  psychologist_id: { type: String, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
