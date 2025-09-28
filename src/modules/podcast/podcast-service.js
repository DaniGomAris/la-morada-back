const Podcast = require("./models/podcast");
const { validatePodcast } = require("./validators/podcast-validator");
const logger = require("../../utils/logger");
const User = require("../user/models/user");

class PodcastService {
  // Create podcast
  static async create(data, user) {
    validatePodcast(data);

    // Obtain user credential by DB
    const dbUser = await User.findById(user.user_id);

    const podcast = new Podcast({
      ...data,
      creator_id: user.user_id,
      creator_name: `${dbUser.name} ${dbUser.last_name1}`,
    });

    await podcast.save();
    logger.info(`Podcast created: ${data.title} by ${user.email}`);
    return podcast;
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
