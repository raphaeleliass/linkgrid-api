import { Router } from "express";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
  userSchema,
} from "./user.schemas";
import { UserController } from "./user.controller";

export const userRouter = Router();

userRouter.post(
  "/create",
  validationMiddleware(createUserSchema),
  UserController.createUser
);

userRouter.put(
  "/update",
  validationMiddleware(updateUserSchema),
  UserController.updateUser
);

userRouter.delete(
  "/delete",
  validationMiddleware(deleteUserSchema),
  UserController.deleteUser
);

userRouter.post(
  "/session",
  validationMiddleware(userSchema),
  UserController.authUser
);
