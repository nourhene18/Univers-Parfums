import { parfumRepository } from "../repositories/parfumRepository.js";

export const parfumService = {

   getAll: (filters = {}) =>
    parfumRepository.findAll(filters),

  getById: (id) =>
    parfumRepository.findById(id),

  getDistinctGenres: () =>
    parfumRepository.getDistinctGenres(),

  create: (parfum) => {
    if (!parfum.nom || !parfum.marque) {
      throw new Error("Nom et marque obligatoires");
    }
    return parfumRepository.create(parfum);
  },

  update: (id, data) =>
    parfumRepository.update(id, data)
};
