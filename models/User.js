import mongoose from "mongoose";

export const Role = {
  USER: "USER",
  AGENT: "AGENT"
};

const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
