import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  async handle(req: Request, res: Response) {
    const { item_name } = req.body;
    const { id_client } = req;
    const createDeliveryUseCase = new CreateDeliveryUseCase();
    const result = await createDeliveryUseCase.execute({
      id_client,
      item_name,
    });

    res.status(201).json(result);
  }
}