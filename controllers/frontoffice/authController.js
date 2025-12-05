import { userService } from "../../services/userService.js";
import { Role } from "../../models/User.js";


export const register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const user = await userService.create({
      nom,
      prenom,
      email,
      password,
      role: Role.USER
    });

    
    req.session.user = {
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role
    };

    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.login(email, password);
    if (!user || user.role !== Role.USER) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    req.session.user = {
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role
    };

    res.json({
      message: "Connecté",
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};


export const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Déconnecté" });
  });
};
