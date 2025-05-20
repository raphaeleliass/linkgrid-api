import { z } from "zod";
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
  userSchema,
} from "./user.schemas";

export type UserTypes = z.infer<typeof userSchema>;

export type CreateUserTypes = z.infer<typeof createUserSchema>;

export type UpdateUserTypes = z.infer<typeof updateUserSchema>;

export type DeleteUserTypes = z.infer<typeof deleteUserSchema>;
