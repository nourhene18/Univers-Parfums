export const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Non authentifié" });
  }
  next();
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.session.user;

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        error: "Accès refusé : rôle non autorisé"
      });
    }

    next();
  };
};
