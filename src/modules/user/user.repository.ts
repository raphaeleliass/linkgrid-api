import { prisma } from "../../config/prisma.config";
import {
  CreateUserTypes,

} from "./user.types";

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
}
