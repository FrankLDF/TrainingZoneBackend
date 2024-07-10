import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.acces_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proporcionó token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token no válido." });
  }
};

export default authMiddleware;
