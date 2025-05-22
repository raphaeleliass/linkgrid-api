import { prisma } from "../../config/prisma.config";
import { CreateUserTypes, DetailUserTypes } from "./user.types";

export class UserRepository {
  static async createUser(data: CreateUserTypes) {
    return await prisma.user.create({
      data,
      select: { id: true, name: true, username: true, email: true },
    });
  }

  static async checkUserUsername(username: string) {
    return await prisma.user.findUnique({ where: { username } });
  }

  static async checkUserEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async detailUser(username: string) {
    return await prisma.user.findUnique({
      where: { username },
      select: { name: true, username: true, links: { omit: { userId: true } } },
    });
  }

  static async detailLoggedUser(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        links: true,
      },
    });
  }
}
