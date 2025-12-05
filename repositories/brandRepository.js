import { Brand } from "../models/Brand.js";

export const brandRepository = {
  findAll: () => Brand.find().lean(),

  findById: (id) => Brand.findById(id).lean(),

  create: (data) => Brand.create(data)
};
