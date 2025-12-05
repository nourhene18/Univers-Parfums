import { reviewService } from "../../services/reviewService.js";

export const createReview = async (req, res) => {
  try {
    const { parfum, note, commentaire } = req.body;

    const review = await reviewService.create({
      user: req.session.user._id, 
      parfum,
      note,
      commentaire
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewsByParfum = async (req, res) => {
  const reviews =
    await reviewService.getByParfum(req.params.parfumId);

  res.json(reviews);
};
