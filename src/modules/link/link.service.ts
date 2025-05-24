import { LinkRepository } from "./link.repository";
import { CreateLinkType, DeleteLinkType, UpdateLinkType } from "./link.types";

export class LinkService {
  static async createLink(data: CreateLinkType) {
    return await LinkRepository.createLink(data);
  }

  static async updateLink(data: UpdateLinkType) {
    await LinkRepository.updateLink(data);
  }

  static async deleteLink(data: DeleteLinkType) {
    return await LinkRepository.deleteLink(data);
  }
}
