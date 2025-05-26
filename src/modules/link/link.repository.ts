import { prisma } from "../../config/prisma.config";
import { CreateLinkType, DeleteLinkType, UpdateLinkType } from "./link.types";

export class LinkRepository {
  static async createLink(data: CreateLinkType & { userId: string }) {
    try {
      return await prisma.link.create({
        data,
        select: { id: true, title: true, href: true, created_at: true },
      });
    } catch (error: any) {
      if (
        error.code === "P2003" ||
        error.message?.includes("Foreign key constraint failed") ||
        error.message?.includes("Foreign key constraint violated")
      ) {
        const fkError: any = new Error("Invalid key.");
        fkError.statusCode = 400;
        throw fkError;
      }
      throw error;
    }
  }

  static async updateLink(data: UpdateLinkType) {
    return await prisma.link.update({
      data,
      where: { id: data.id },
      select: { id: true, title: true, href: true, updated_at: true },
    });
  }

  static async deleteLink(data: DeleteLinkType) {
    return await prisma.link.delete({
      where: { id: data.id },
      select: { id: true, title: true, href: true },
    });
  }
}
