import { Request, Response } from "express";
import {
  CreateUserTypes,
  DeleteUserTypes,
  UpdateUserTypes,
} from "./user.types";
import { UserService } from "./user.service";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const createUserInput: CreateUserTypes = req.body;

    const newUser = await UserService.createUser(createUserInput);

    res.json(newUser);
  }

  static async updateUser(req: Request, res: Response) {
    const updateUserInput: UpdateUserTypes = req.body;

    const updatedUser = await UserService.updateUser(updateUserInput);

    res.json(updatedUser);
  }

  static async deleteUser(req: Request, res: Response) {
    const deleteUserInput: DeleteUserTypes = req.body;

    const deletedUser = await UserService.deleteUser(deleteUserInput);

    res.json(deletedUser);
  }

  static async authUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUser = await UserService.authUser(email, password);

    res.json(authUser);
  }
}
