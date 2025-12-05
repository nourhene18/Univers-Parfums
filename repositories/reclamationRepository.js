import { Reclamation } from "../models/Reclamation.js";

export const reclamationRepository = {
  findAll: (filter = {}) =>
    Reclamation.find(filter)
      .populate({
        path: "review",
        populate: [
          {
            path: "parfum",
            select: "nom"
          },
          {
            path: "user",
            select: "nom prenom"
          }
        ]
      })
      .populate("user", "nom prenom")
      .lean(),

  findById: (id) =>
    Reclamation.findById(id)
      .populate({
        path: "review",
        populate: [
          {
            path: "parfum",
            select: "nom"
          },
          {
            path: "user",
            select: "nom prenom"
          }
        ]
      })
      .populate("user", "nom prenom")
      .lean(),

  create: (data) => Reclamation.create(data),

  update: (id, data) =>
    Reclamation.findByIdAndUpdate(id, data, { new: true })
};
