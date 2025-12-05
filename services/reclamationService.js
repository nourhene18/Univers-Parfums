import { reclamationRepository } from "../repositories/reclamationRepository.js";
import { Statut } from "../models/Reclamation.js";
export const reclamationService = {
  getAll: (filter = {}) =>
    reclamationRepository.findAll(filter),

  getById: (id) =>
    reclamationRepository.findById(id),

  create: (reclamation) => {
    if (!reclamation.review || !reclamation.user) {
      throw new Error("Réclamation invalide");
    }
    return reclamationRepository.create(reclamation);
  },

  update: (id, data) =>
    reclamationRepository.update(id, data),

  traiter: (id) =>
    reclamationRepository.update(id, {
      statut: Statut.TRAITEE
    }),

  rejeter: (id) =>
    reclamationRepository.update(id, {
      statut: Statut.REJETEE
    })
};
