import { User } from "../models/User.js";

export const userRepository = {
  findAll: () => User.find().lean(),

  findById: (id) => User.findById(id).lean(),

  findByEmail: (email) =>
    User.findOne({ email }).lean(),

  create: (data) => User.create(data),

  update: (id, data) =>
    User.findByIdAndUpdate(id, data, { new: true })
};
