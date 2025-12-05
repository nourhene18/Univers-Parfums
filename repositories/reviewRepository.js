import { Review } from "../models/Review.js";

export const reviewRepository = {
  findAll: (filter = {}) =>
    Review.find(filter)
      .populate("parfum", "nom")
      .populate("user", "prenom nom")
      .lean(),

  findById: (id) =>
    Review.findById(id)
      .populate("parfum", "nom")
      .populate("user", "prenom nom"),

  create: (data) =>
    Review.create(data),

  update: (id, data) =>
    Review.findByIdAndUpdate(id, data, { new: true })
};
