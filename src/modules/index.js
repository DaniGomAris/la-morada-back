const authRoutes = require("./auth/auth-routes");
const userRoutes = require("./user/user-routes");
const appointmentRoutes = require("./appointment/appointment-routes");
const availabilityRoutes = require("./availability/availability-routes");
const productRoutes = require("./product/product-routes");
const cartRoutes = require("./cart/cart-routes");
const postRoutes = require("./post/post-routes");
const podcastRoutes = require("./podcast/podcast-routes");
const paymentRoutes = require("./payment/payment-routes");

module.exports = {
  authRoutes,
  userRoutes,
  appointmentRoutes,
  availabilityRoutes,
  productRoutes,
  cartRoutes,
  postRoutes,
  podcastRoutes,
  paymentRoutes
};
