import { verifyToken } from "../utils/jwt.utils.js";

const Authorization = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token." });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authorization Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during authorization." });
  }
};

export default Authorization;
