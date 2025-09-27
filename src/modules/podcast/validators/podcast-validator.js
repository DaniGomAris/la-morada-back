function validatePodcast(data) {
  if (!data.title || typeof data.title !== "string" || data.title.length > 100) {
    throw new Error("INVALID TITLE");
  }

  if (!data.youtubeId || typeof data.youtubeId !== "string") {
    throw new Error("INVALID YOUTUBE ID");
  }

  if (data.description && typeof data.description !== "string") {
    throw new Error("INVALID DESCRIPTION");
  }
}

module.exports = { validatePodcast };
