import mongoose from "mongoose";

export const TypeMarque = {
  DESIGNER: "Designer",
  NICHE: "Niche",
  ARTISANALE: "Artisanale",
  CELEBRITE: "Célébrité",
  AUTRE: "Autre"
};

const brandSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    pays: { type: String, required: true },

    type: {
      type: String,
      enum: Object.values(TypeMarque),
      default: TypeMarque.DESIGNER
    }
  },
  { timestamps: true }
);

brandSchema.index({ nom: 1 });

export const Brand =
  mongoose.models.Brand ||
  mongoose.model("Brand", brandSchema);
