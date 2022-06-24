import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "./ensureAuthenticateClient";

export async function ensureAuthenticateDeliveryman(
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
    const { sub } = verify(token, "porenquantovaiessa2") as IPayload;

    req.id_deliveryman = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      error,
    });
  }
}
