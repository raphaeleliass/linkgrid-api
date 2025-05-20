import { UserRepository } from "./user.repository";
import { AuthUserTypes, CreateUserTypes, DetailUserTypes } from "./user.types";
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

    if (checkEmail) {
      const error: any = new Error("Email is already in use");
      error.statusCode = 409;
      throw error;
    }
    if (checkUsername) {
      const error: any = new Error("Username is already in use");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await hash(password, 8);

    return await UserRepository.createUser({
      name,
      username,
      email,
      password: hashedPassword,
    });
  }

  static async detailUser(username: string) {
    const user = await UserRepository.detailUser(username);

    if (!user) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return user
  }

  static async authUser({ email, password }: AuthUserTypes) {
    const user = await UserRepository.checkUserEmail(email);

    if (!user) {
      const error: any = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const hashedPassword = await compare(password, user.password)!;
    if (!hashedPassword) {
      const error: any = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: "30d",
    });

    return { id: user.id, username: user.username, email: user.email, token };
  }
}
