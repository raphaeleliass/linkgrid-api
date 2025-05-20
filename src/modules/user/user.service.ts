import { UserRepository } from "./user.repository";
import {
  CreateUserTypes,
  DeleteUserTypes,
  UpdateUserTypes,
} from "./user.types";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class UserService {
  static async createUser({
    name,
    username,
    email,
    password,
  }: CreateUserTypes) {
    const checkEmail = await UserRepository.checkUserEmail(email);
    const checkUsername = await UserRepository.checkUserUsername(username);

    if (checkEmail) throw new Error("Email is already in use");
    if (checkUsername) throw new Error("Username is already in use");

    const hashedPassword = await hash(password, 8);

    return await UserRepository.createUser({
      name,
      username,
      email,
      password: hashedPassword,
    });
  }

  static async updateUser({ name, username, password, id }: UpdateUserTypes) {
    let hashedPassword;

    if (password) hashedPassword = await hash(password, 8);

    return await UserRepository.updateUser({
      name,
      username,
      id,
      ...(hashedPassword && { password: hashedPassword }),
    });
  }

  static async deleteUser(data: DeleteUserTypes) {
    return await UserRepository.deleteUser(data);
  }

  static async authUser(email: string, password: string) {
    const user = await UserRepository.checkUserEmail(email);

    if (!user) throw new Error("Invalid credentials");

    const hashedPassword = await compare(password, user.password)!;
    if (!hashedPassword) throw new Error("Invalid credentials");

    const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: "30d",
    });

    return { id: user.id, email: user.email, token };
  }
}
