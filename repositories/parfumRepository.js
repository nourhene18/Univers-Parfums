import mongoose from "mongoose";
import { Parfum } from "../models/parfum.js";
import { Brand } from "../models/brand.js";

export const parfumRepository = {

  findAll: async (filters = {}) => {
  const query = {};

  if (filters.q) {
    query.$text = { $search: filters.q };
  }

  if (filters.genre) {
    query.genre = filters.genre;
  }

  if (filters.archived !== undefined) {
    query.archived = filters.archived;
  }

  if (filters.brand) {
    if (mongoose.Types.ObjectId.isValid(filters.brand)) {
      query.marque = filters.brand;
    } else {
      const brands = await Brand.find({
        nom: { $regex: filters.brand, $options: "i" }
      }).select("_id");

      query.marque = { $in: brands.map(b => b._id) };
    }
  }

  return Parfum.find(query)
    .populate("marque")
    .sort({ createdAt: -1 });
},


  findById: (id) =>
    Parfum.findById(id).populate("marque"),

  create: (data) =>
    Parfum.create(data),

  update: (id, data) =>
    Parfum.findByIdAndUpdate(id, data, { new: true }),

  getDistinctGenres: () =>
    Parfum.distinct("genre")
};
