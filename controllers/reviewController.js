const Review = require('./../models/reviewModel');
const factory = require('./handleFactory');

exports.setDriverUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.driver) req.body.driver = req.params.driverId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
