import mongoose from "mongoose";

export const Statut = {
  EN_ATTENTE: "En attente",
  TRAITEE: "Traitée",
  REJETEE: "Rejetée"
};

export const Motif = {
  CONTENU_INAPPROPRIE: "Contenu inapproprié",
  LANGAGE_OFFENSANT: "Langage offensant",
  MENSONGE: "Avis mensonger",
  PUBLICITE: "Publicité ou spam",
  AUTRE: "Autre"
};

const reclamationSchema = new mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    motif: {
      type: String,
      enum: Object.values(Motif),
      default: Motif.AUTRE
    },

    description: { type: String },

    statut: {
      type: String,
      enum: Object.values(Statut),
      default: Statut.EN_ATTENTE
    }
  },
  { timestamps: true }
);

export const Reclamation = mongoose.model(
  "Reclamation",
  reclamationSchema
);
