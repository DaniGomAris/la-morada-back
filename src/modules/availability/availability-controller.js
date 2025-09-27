const AvailabilityService = require("./availability-service");
const { handleError } = require("../../handlers/error-handler");

class AvailabilityController {
  // Create or update availability
  static async upsert(req, res) {
    try {
      const availability = await AvailabilityService.createOrUpdate(
        req.user.user_id,
        req.body
      );
      res.status(200).json({ success: true, availability });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Delete availability
  static async delete(req, res) {
    try {
      const result = await AvailabilityService.delete(req.params.id);
      res.status(200).json({ success: true, result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Get availability for a psychologist
  static async get(req, res) {
    try {
      const availability = await AvailabilityService.getByPsychologist(
        req.user.user_id
      );
      res.json({ success: true, availability });
    } catch (err) {
      handleError(res, err);
    }
  }
}

module.exports = AvailabilityController;
