import { Router } from "express";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { authUserSchema, createUserSchema } from "./user.schemas";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.post(
  "/create",
  validationMiddleware(createUserSchema),
  UserController.createUser
);

userRouter.post(
  "/session",
  validationMiddleware(authUserSchema),
  UserController.authUser
);
