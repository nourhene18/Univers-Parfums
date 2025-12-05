import express from "express";
import * as parfum from "../controllers/backoffice/parfumBoController.js";
import * as review from "../controllers/backoffice/reviewBoController.js";
import * as brand from "../controllers/backoffice/brandBoController.js";
import * as auth from "../controllers/backoffice/authBoController.js";
import * as reclamation from "../controllers/backoffice/reclamationBoController.js";
import {
  backofficeAuthenticated,
  backofficeAgentOnly
} from "../middlewares/authBackoffice.js";

const router = express.Router();

router.get("/login", auth.showLogin);
router.post("/login", auth.login);


router.use(backofficeAuthenticated);
router.use(backofficeAgentOnly);

router.get("/logout", auth.logout);

router.get("/parfums", parfum.listParfums);
router.get("/parfums/new", parfum.showCreateForm);
router.post("/parfums", parfum.createParfum);

router.get("/parfums/:id", parfum.showParfumDetails);

router.get("/parfums/:id/edit", parfum.showEditForm);
router.post("/parfums/:id/edit", parfum.updateParfum);

router.post("/parfums/:id/archive", parfum.archiveParfum);
router.post("/parfums/:id/unarchive", parfum.unarchiveParfum);

router.get("/brands", brand.listBrands);
router.get("/brands/new", brand.showCreateForm);
router.post("/brands", brand.createBrand);

router.get("/reviews", review.listReviews);
router.get("/reviews/:id", review.showReviewDetails);
router.post("/reviews/:id/visibility", review.toggleReviewVisibility);

router.get("/reclamations", reclamation.listReclamations);
router.get("/reclamations/:id", reclamation.showReclamationDetails);
router.post("/reclamations/:id/traiter", reclamation.traiterReclamation);
router.post("/reclamations/:id/rejeter", reclamation.rejeterReclamation);

export default router;
