import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    parfum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parfum",
      required: true
    },

    commentaire: { type: String },

    note: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },

    visible: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, parfum: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);
