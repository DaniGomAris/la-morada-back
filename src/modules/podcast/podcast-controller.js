const PodcastService = require("./podcast-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class PodcastController {
  // Create podcast
  static async create(req, res) {
    try {
      const podcast = await PodcastService.create(req.body, req.user);
      res.status(201).json({ success: true, podcast });
    } catch (err) {
      logger.error(`PodcastController.create: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get all podcasts
  static async getAll(req, res) {
    try {
      const podcasts = await PodcastService.getAll();
      res.status(200).json({ success: true, podcasts });
    } catch (err) {
      logger.error(`PodcastController.getAll: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = PodcastController;
