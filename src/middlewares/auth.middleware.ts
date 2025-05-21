import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET!) as Payload;
    req.userId = sub;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
