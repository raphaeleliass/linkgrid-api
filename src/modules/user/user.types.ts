import { z } from "zod";
import { authUserSchema, createUserSchema, detailUserSchema, userSchema } from "./user.schemas";

export type UserTypes = z.infer<typeof userSchema>;

export type CreateUserTypes = z.infer<typeof createUserSchema>;

export type AuthUserTypes = z.infer<typeof authUserSchema>;

export type DetailUserTypes = z.infer<typeof detailUserSchema>
