import { reclamationService } from "../../services/reclamationService.js";

export const createReclamation = async (req, res) => {
  try {
    const { review, motif, description } = req.body;

    const reclamation = await reclamationService.create({
      user: req.session.user._id, 
      review,
      motif,
      description
    });

    res.status(201).json(reclamation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};