import { Request, Response } from "express";
import { CreateLinkType, DeleteLinkType, UpdateLinkType } from "./link.types";
import { LinkService } from "./link.service";
import { LinkRepository } from "./link.repository";

export class LinkController {
  static async createLink(req: Request, res: Response) {
    const createPayload: CreateLinkType = req.body;

    const createdLink = await LinkService.createLink(createPayload);

    res.json(createdLink);
  }

  static async updateLink(req: Request, res: Response) {
    const updatePayload: UpdateLinkType = req.body;

    const updatedLink = await LinkRepository.updateLink(updatePayload);

    res.json(updatedLink);
  }

  static async deleteLink(req: Request, res: Response) {
    const { id } = req.query;

    if (typeof id !== "string" || !id) {
      res.status(400).json({ message: "ID do link é inválido ou ausente." });
      return;
    }

    try {
      const deletedLink = await LinkService.deleteLink({ id });
      res.json(deletedLink);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Erro ao deletar link." });
    }
  }
}
