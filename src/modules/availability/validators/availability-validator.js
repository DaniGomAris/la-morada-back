const User = require("../../user/models/user");

const DAYS_OF_WEEK = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];

function isValidTime(time) {
  return /^\d{2}:\d{2}$/.test(time);
}

async function validateAvailability(data) {
  if (!data.psychologist_id) throw new Error("PSYCHOLOGIST_ID REQUIRED");

  const psychologist = await User.findById(data.psychologist_id);
  if (!psychologist) throw new Error("USER NOT FOUND");
  if (psychologist.role !== "psychologist") throw new Error("INVALID ROLE");

  if (!Array.isArray(data.days) || data.days.length === 0)
    throw new Error("DAYS REQUIRED");

  if (!Array.isArray(data.slots) || data.slots.length !== data.days.length)
    throw new Error("SLOTS MUST MATCH DAYS LENGTH");

  for (const day of data.days) {
    if (!DAYS_OF_WEEK.includes(day.toLowerCase()))
      throw new Error("INVALID DAY");
  }

  for (const slot of data.slots) {
    if (!isValidTime(slot.start) || !isValidTime(slot.end))
      throw new Error("INVALID SLOT TIME");
  }
}

module.exports = { validateAvailability };
