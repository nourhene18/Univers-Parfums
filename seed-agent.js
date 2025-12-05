import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";

await mongoose.connect("mongodb://127.0.0.1:27017/parfum_app");

const password = await bcrypt.hash("admin123", 10);

await User.create({
  nom: "Admin",
  prenom: "Agent",
  email: "agent@parfum.com",
  password,
  role: "AGENT"
});

console.log("Agent créé");
process.exit();
