import { reviewRepository } from "../repositories/reviewRepository.js";

export const reviewService = {
  getAll: (filter = {}) =>
    reviewRepository.findAll(filter),

  getById: (id) =>
    reviewRepository.findById(id),
  getByParfum: (parfumId) =>
    reviewRepository.findAll({
      parfum: parfumId,
      visible: true
    }),

  create: (review) =>
    reviewRepository.create(review),

  update: (id, data) =>
    reviewRepository.update(id, data),

  masquer: (id, visible) =>
    reviewRepository.update(id, { visible })
};