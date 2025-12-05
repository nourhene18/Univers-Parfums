import express from "express";
import * as parfum from "../controllers/frontoffice/parfumController.js";
import * as review from "../controllers/frontoffice/reviewController.js";
import * as reclamation from "../controllers/frontoffice/reclamationController.js";
import { isAuthenticated } from "../middlewares/authApi.js";

const router = express.Router();

router.get("/parfums", parfum.getAllParfums);
router.get("/parfums/:id", parfum.getParfumById);

router.get("/parfums/:parfumId/reviews",review.getReviewsByParfum);
router.post("/reviews",isAuthenticated,review.createReview);


router.post("/reclamations",isAuthenticated,reclamation.createReclamation);

export default router;
