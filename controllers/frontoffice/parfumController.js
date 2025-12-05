import { parfumService } from "../../services/parfumService.js";

export const getAllParfums = async (req, res) => {
  const { genre, brand, note, q } = req.query;

  const filters = {
    genre,
    brand,
    note,
    q,
    archived: false 
  };

  const parfums = await parfumService.getAll(filters);
  res.json(parfums);
};

export const getParfumById = async (req, res) => {
  const parfum = await parfumService.getById(req.params.id);

  if (!parfum || parfum.archived) {
    return res.status(404).json({ error: "Parfum introuvable" });
  }

  res.json(parfum);
};
