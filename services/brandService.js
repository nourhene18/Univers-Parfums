import { brandRepository } from "../repositories/brandRepository.js";

export const brandService = {
  getAll: () => brandRepository.findAll(),

  getById: (id) => brandRepository.findById(id),

  create: (brand) => {
    if (!brand.nom || !brand.pays) {
      throw new Error("Nom et pays requis");
    }
    return brandRepository.create(brand);
  }
};
