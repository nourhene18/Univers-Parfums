import { brandService } from "../../services/brandService.js";

export const listBrands = async (req, res) => {
  const brands = await brandService.getAll();
  res.render("backoffice/brands/list", { brands });
};

export const showCreateForm = (req, res) => {
  res.render("backoffice/brands/form");
};

export const createBrand = async (req, res) => {
  await brandService.create(req.body);
  res.redirect("/backoffice/brands");
};
