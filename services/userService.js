import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";

export const userService = {
  getAll: () => userRepository.findAll(),

  getById: (id) => userRepository.findById(id),

  create: async ({ nom, prenom, email, password, role }) => {
    const exists = await userRepository.findByEmail(email);
    if (exists) {
      throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return userRepository.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role
    });
  },

  update: async (id, data) => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return userRepository.update(id, data);
  },
  login: async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }
};
