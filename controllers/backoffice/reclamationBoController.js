import { reclamationService } from "../../services/reclamationService.js";
import { reviewService } from "../../services/reviewService.js";

export const listReclamations = async (req, res) => {
  const { statut, motif } = req.query;

  const filter = {};

  if (statut && statut !== "") {
    filter.statut = statut;
  }

  if (motif && motif !== "") {
    filter.motif = motif;
  }

  const reclamations = await reclamationService.getAll(filter);

  res.render("backoffice/reclamations/list", {
    reclamations,
    statut,
    motif
  });
};


export const showReclamationDetails = async (req, res) => {
  const reclamation =
    await reclamationService.getById(req.params.id);

  res.render("backoffice/reclamations/details", {
    reclamation
  });
};

export const traiterReclamation = async (req, res) => {
  const reclamation =
    await reclamationService.getById(req.params.id);

  await reviewService.masquer(
    reclamation.review._id,
    false
  );

  await reclamationService.update(req.params.id, {
    statut: "Traitée"
  });

  res.redirect(`/backoffice/reclamations/${req.params.id}`);
};

export const rejeterReclamation = async (req, res) => {
  await reclamationService.update(req.params.id, {
    statut: "Rejetée"
  });

  res.redirect(`/backoffice/reclamations/${req.params.id}`);
};
