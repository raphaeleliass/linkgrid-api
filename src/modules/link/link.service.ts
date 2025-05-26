import { LinkRepository } from "./link.repository";
import { CreateLinkType, DeleteLinkType, UpdateLinkType } from "./link.types";

export class LinkService {
  static async createLink(
    data: Omit<CreateLinkType, "userId">,
    userId: string
  ) {
    return await LinkRepository.createLink({ ...data, userId });
  }

  static async updateLink(data: UpdateLinkType) {
    await LinkRepository.updateLink(data);
  }

  static async deleteLink(query: any) {
    const { id } = query;
    if (typeof id !== "string" || !id) {
      const error: any = new Error("ID do link é inválido ou ausente.");
      error.statusCode = 400;
      throw error;
    }
    try {
      return await LinkRepository.deleteLink({ id });
    } catch (error: any) {
      if (
        error.code === "P2025" ||
        error.message?.includes("No record was found")
      ) {
        const notFoundError: any = new Error("Link not found");
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      throw error;
    }
  }
}
