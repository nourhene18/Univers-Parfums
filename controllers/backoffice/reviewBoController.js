import { reviewService } from "../../services/reviewService.js";
import { parfumService } from "../../services/parfumService.js";

export const listReviews = async (req, res) => {
  const { parfum, visible, note } = req.query;

  const filter = {};

  if (parfum) filter.parfum = parfum;
  if (visible === "true") filter.visible = true;
  if (visible === "false") filter.visible = false;

 
  if (note) filter.note = Number(note);

  const reviews = await reviewService.getAll(filter);
  const parfums = await parfumService.getAll();

  res.render("backoffice/reviews/list", {
    reviews,
    parfums,
    parfum,
    visible,
    note
  });
};



export const showReviewDetails = async (req, res) => {
  const review = await reviewService.getById(req.params.id);
  res.render("backoffice/reviews/details", { review });
};

export const toggleReviewVisibility = async (req, res) => {
  await reviewService.masquer(
    req.params.id,
    req.body.visible === "true"
  );
  res.redirect("/backoffice/reviews");
};
