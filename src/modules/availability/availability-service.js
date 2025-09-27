const Availability = require("./models/availability");
const User = require("../user/models/user");
const { validateAvailability } = require("./validators/availability-validator");
const logger = require("../../utils/logger");

class AvailabilityService {
  // Create or update availability
  static async createOrUpdate(user_id, data) {
    try {
      await validateAvailability({ ...data, psychologist_id: user_id });

      const user = await User.findById(user_id);
      if (!user) throw new Error("USER NOT FOUND");
      if (user.role !== "psychologist") throw new Error("INVALID ROLE");

      let availability;

      if (user.availability_id) {
        // Update existing availability
        availability = await Availability.findById(user.availability_id);
        if (!availability) throw new Error("AVAILABILITY NOT FOUND");

        availability.days = data.days;
        availability.slots = data.slots;
        await availability.save();
        logger.info(`Availability updated for user ${user_id}`);
      } else {
        // Create new availability
        availability = new Availability({ ...data });
        await availability.save();

        user.availability_id = availability._id;
        await user.save();
        logger.info(`Availability created for user ${user_id}`);
      }

      return availability;
    } catch (err) {
      logger.error(`AvailabilityService.createOrUpdate: ${err.message}`);
      throw err;
    }
  }

  // Delete availability
  static async delete(id) {
    try {
      const availability = await Availability.findByIdAndDelete(id);
      if (!availability) throw new Error("AVAILABILITY NOT FOUND");

      // Remove reference from user
      const user = await User.findOne({ availability_id: id });
      if (user) {
        user.availability_id = null;
        await user.save();
      }

      logger.info(`Availability ${id} deleted`);
      return availability;
    } catch (err) {
      logger.error(`AvailabilityService.delete: ${err.message}`);
      throw err;
    }
  }

  // Get availability by psychologist
  static async getByPsychologist(user_id) {
    try {
      const user = await User.findById(user_id);
      if (!user) throw new Error("USER NOT FOUND");
      if (!user.availability_id) return null;

      const availability = await Availability.findById(user.availability_id);
      return availability;
    } catch (err) {
      logger.error(`AvailabilityService.getByPsychologist: ${err.message}`);
      throw err;
    }
  }
}

module.exports = AvailabilityService;
