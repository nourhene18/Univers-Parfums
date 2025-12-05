import { userService } from "../../services/userService.js";
import { Role } from "../../models/User.js";

export const showLogin = (req, res) => {
  res.render("auth/login", {
    layout: false,         
    error: null
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.login(email, password);

    if (!user || user.role !== Role.AGENT) {
      return res.render("auth/login", {
        layout: false,     
        error: "Accès réservé aux agents"
      });
    }

    req.session.user = {
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role
    };

    res.redirect("/backoffice/parfums");
  } catch (err) {
    res.render("auth/login", {
      layout: false,     
      error: "Erreur serveur"
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/backoffice/login");
  });
};
