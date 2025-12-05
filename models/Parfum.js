import mongoose from "mongoose";

export const Genre = {
  HOMME: "Homme",
  FEMME: "Femme",
  UNISEXE: "Unisexe"
};

export const NoteOlfactive = {
  FLORAL: "Floral",
  BOISE: "Boisé",
  ORIENTAL: "Oriental",
  FRUITE: "Fruité",
  MARIN: "Marin",
  EPICE: "Épicé",
  CITRUS: "Citrus",
  GOURMAND: "Gourmand",
  CHYPRE: "Chypré",
  MUSQUE: "Musqué",
  CUIR: "Cuir",
  POUDRE: "Poudré",
  SUCRE: "Sucré",
  FUME: "Fumé"
};

const parfumSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },

    marque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },

    genre: {
      type: String,
      enum: Object.values(Genre),
      default: Genre.UNISEXE
    },

    notes: [
      {
        type: String,
        enum: Object.values(NoteOlfactive)
      }
    ],

    description: String,
    image: String,

    archived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

parfumSchema.index({ nom: "text", description: "text" });
parfumSchema.index(
  { nom: 1, marque: 1 },
  { unique: true }
);

export const Parfum =
  mongoose.models.Parfum ||
  mongoose.model("Parfum", parfumSchema);
