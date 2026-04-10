function authMiddleware(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      message: 'Sesión no activa'
    });
  }

  next();
}

module.exports = authMiddleware;