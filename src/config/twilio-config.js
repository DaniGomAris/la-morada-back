const sgMail = require("@sendgrid/mail");
const logger = require("../utils/logger");

const connectTwilio = async () => {
  try {
    // Verify API Key
    if (!process.env.SENDGRID_API_KEY) {
      logger.error("SENDGRID_API_KEY is not in .env");
      process.exit(1);
    }

    // Sengrid Mail setup
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    logger.info("Connected to twilio");
    return sgMail;
  } catch (error) {
    logger.error("Twilio connection failed", error);
    process.exit(1);
  }
};

module.exports = connectTwilio;
