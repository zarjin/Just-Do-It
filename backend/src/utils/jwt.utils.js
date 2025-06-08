import JWT from "jsonwebtoken";

export const generateToken = (userId) => {
  return JWT.sign({ id: userId }, process.env.JWT_SECRET);
};

export const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};
