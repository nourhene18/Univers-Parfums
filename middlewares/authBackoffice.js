import { Role } from "../models/User.js";

export const backofficeAuthenticated = (req, res, next) => {
  if (!req.session?.user) {
    return res.redirect("/backoffice/login");
  }
  next();
};

export const backofficeAgentOnly = (req, res, next) => {
  const user = req.session.user;

  if (user.role !== Role.AGENT) {
    return res.status(403).send("Accès interdit");
  }

  next();
};
