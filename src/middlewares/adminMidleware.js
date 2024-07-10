const adminMiddleware = (req, res, next) => {
  if (req.user.tipo_usuario !== 2) {
    return res
      .status(403)
      .json({
        message:
          "Acceso denegado. Sólo los administradores pueden acceder a esta ruta.",
      });
  }
  next();
};

export default adminMiddleware;
