import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "porenquantovaiessa") as IPayload;

    req.id_client = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      error,
    });
  }
}
