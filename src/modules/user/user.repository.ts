import { prisma } from "../../config/prisma.config";
import {
  CreateUserTypes,
  DeleteUserTypes,
  UpdateUserTypes,
} from "./user.types";

export class UserRepository {
  static async createUser(data: CreateUserTypes) {
    return await prisma.user.create({
      data,
      select: { id: true, name: true, username: true, email: true },
    });
  }

  static async updateUser(data: UpdateUserTypes) {
    return await prisma.user.update({
      data,
      where: { email: data.id },
    });
  }

  static async deleteUser({ id }: DeleteUserTypes) {
    return await prisma.user.delete({ where: { id } });
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
