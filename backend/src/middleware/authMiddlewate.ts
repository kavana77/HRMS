import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../utils/validateEnv";

interface UserPayload extends JwtPayload {
  id: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as UserPayload;
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default verifyToken;
