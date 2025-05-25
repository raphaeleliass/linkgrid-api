import { Request, Response } from "express";
import { CreateLinkType, DeleteLinkType, UpdateLinkType } from "./link.types";
import { LinkService } from "./link.service";
import { LinkRepository } from "./link.repository";

export class LinkController {
  static async createLink(req: Request, res: Response) {
    const userId = req.userId;
    const createPayload = req.body;

    const createdLink = await LinkService.createLink(createPayload, userId);

    res.json(createdLink);
  }

  static async updateLink(req: Request, res: Response) {
    const updatePayload: UpdateLinkType = req.body;

    const updatedLink = await LinkRepository.updateLink(updatePayload);

    res.json(updatedLink);
  }

  static async deleteLink(req: Request, res: Response) {
    const id = req.query;

    const deletedLink = await LinkService.deleteLink(id);

    res.json(deletedLink);
  }
}
