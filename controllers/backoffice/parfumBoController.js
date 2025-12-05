import { parfumService } from "../../services/parfumService.js";
import { brandService } from "../../services/brandService.js";
import { reviewService } from "../../services/reviewService.js";


export const listParfums = async (req, res) => {
  const { q, genre, brand, status } = req.query;

  const filters = {
    q,
    genre,
    brand,
    archived:
      status === "active" ? false :
      status === "archived" ? true :
      undefined
  };

  const parfums = await parfumService.getAll(filters);
  const brands = await brandService.getAll();
  const genres = await parfumService.getDistinctGenres();

  res.render("backoffice/parfums/list", {
    parfums,
    brands,
    genres,
    q,
    genre,
    brand,
    status
  });
};



export const showCreateForm = async (req, res) => {
  const brands = await brandService.getAll();

  res.render("backoffice/parfums/form", {
    brands,
    parfum: null,
    isEdit: false,
    error: null  
  });
};


export const createParfum = async (req, res) => {
  try {
    await parfumService.create(req.body);

    res.redirect("/backoffice/parfums");

  } catch (err) {

    if (err.code === 11000) {
      const brands = await brandService.getAll();

      return res.render("backoffice/parfums/form", {
        brands,
        parfum: req.body,   
        isEdit: false,
        error: "Ce parfum existe déjà pour cette marque."
      });
    }

    throw err;
  }
};




export const showParfumDetails = async (req, res) => {
  const parfum = await parfumService.getById(req.params.id);
  const reviews = await reviewService.getAll({ parfum: req.params.id });

  res.render("backoffice/parfums/details", {
    parfum,
    reviews
  });
};


export const showEditForm = async (req, res) => {
  const parfum = await parfumService.getById(req.params.id);
  const brands = await brandService.getAll();

  res.render("backoffice/parfums/form", {
    parfum,
    brands,
    isEdit: true,
    error: null 
  });
};


export const updateParfum = async (req, res) => {
  await parfumService.update(req.params.id, req.body);
  res.redirect(`/backoffice/parfums/${req.params.id}`);
};

export const archiveParfum = async (req, res) => {
  await parfumService.update(req.params.id, { archived: true });
  res.redirect("/backoffice/parfums");
};

export const unarchiveParfum = async (req, res) => {
  await parfumService.update(req.params.id, { archived: false });
  res.redirect("/backoffice/parfums");
};
