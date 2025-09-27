const Availability = require("./models/availability");
const User = require("../user/models/user-model");
const { validateAvailability } = require("./validators/availability-validator");

class AvailabilityService {
  // Create or update availability
  static async createOrUpdate(user_id, data) {
    // Validate availability data (does not save in DB)
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
    } else {
      // Create new availability and link to user
      availability = new Availability({ ...data });
      await availability.save();

      user.availability_id = availability._id;
      await user.save();
    }

    return availability;
  }

  // Delete availability
  static async delete(id) {
    const availability = await Availability.findByIdAndDelete(id);
    if (!availability) throw new Error("AVAILABILITY NOT FOUND");

    // Remove availability reference from user
    const user = await User.findOne({ availability_id: id });
    if (user) {
      user.availability_id = null;
      await user.save();
    }

    return availability;
  }

  // Get availability by psychologist
  static async getByPsychologist(user_id) {
    const user = await User.findById(user_id);
    if (!user) throw new Error("USER NOT FOUND");

    if (!user.availability_id) return null;

    return await Availability.findById(user.availability_id);
  }
}

module.exports = AvailabilityService;
