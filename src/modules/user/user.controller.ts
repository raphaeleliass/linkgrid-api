import { Request, Response } from "express";
import { AuthUserTypes, CreateUserTypes, DetailUserTypes } from "./user.types";
import { UserService } from "./user.service";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const createUserInput: CreateUserTypes = req.body;

    const newUser = await UserService.createUser(createUserInput);

    res.json(newUser);
  }

  static async authUser(req: Request, res: Response) {
    const { email, password }: AuthUserTypes = req.body;

    const authUser = await UserService.authUser({ email, password });

    res.json(authUser);
  }

  static async detailUser(req: Request, res: Response) {
    const username = req.params.username as string;

    const user = await UserService.detailUser(username);

    res.json(user);
  }
}
