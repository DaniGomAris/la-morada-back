const Podcast = require("./models/podcast");
const { validatePodcast } = require("./validators/podcast-validator");
const logger = require("../../utils/logger");

class PodcastService {
  // Create podcast
  static async create(data, user) {
    try {
      validatePodcast(data);

      const podcast = new Podcast({
        ...data,
        creator_id: user.user_id,
        creator_name: `${user.name} ${user.last_name1}`,
      });

      await podcast.save();
      logger.info(`Podcast created: ${data.title} by ${user.email}`);
      return podcast;
    } catch (err) {
      logger.error(`PodcastService.create: ${err.message}`);
      throw err;
    }
  }

  // Get all podcasts
  static async getAll() {
    try {
      const podcasts = await Podcast.find().sort({ createdAt: -1 }).lean();
      return podcasts;
    } catch (err) {
      logger.error(`PodcastService.getAll: ${err.message}`);
      throw err;
    }
  }
}

module.exports = PodcastService;
