import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const authHeader = req.headers.authorization;
  console.log("HEADER COMPLETO:", authHeader);
  console.log("TOKEN RICEVUTO:", token);
  console.log("JWT SECRET:", process.env.JWT_SECRET);
  console.log("TOKEN ESTRATTO:", token);

  if (!token) {
    res.status(401).json({ error: "Token mancante" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    console.log("ERRORE JWT:", err);
    res.status(401).json({ error: "Token non valido" });
  }
};
