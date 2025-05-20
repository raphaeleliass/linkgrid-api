import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(2, "User must contain at least 2 characters")
    .refine((val) => !val.includes(" "), "Username cannot contain spaces"),
  email: z.string().email("Invalid email").trim(),
  password: z
    .string()
    .min(6, "Password must contain 6 characters at least")
    .trim(),
  name: z
    .string()
    .min(2, "Name must contain 2 at least 2 characters")
    .trim()
    .optional(),
});

export const createUserSchema = z.object({
  username: z
    .string()
    .min(2, "User must contain at least 2 characters")
    .refine((val) => !val.includes(" "), "Username cannot contain spaces"),
  email: z.string().email("Invalid email").trim(),
  password: z
    .string()
    .min(6, "Password must contain 6 characters at least")
    .trim(),
  name: z
    .string()
    .min(2, "Name must contain 2 at least 2 characters")
    .trim()
    .optional(),
});

export const updateUserSchema = z.object({
  id: z.string().nonempty("Id is required"),
  username: z
    .string()
    .min(2, "User must contain at least 2 characters")
    .trim()
    .refine((val) => !val.includes(" "), "Username cannot contain spaces")
    .optional(),
  password: z
    .string()
    .min(6, "Password must contain 6 characters at least")
    .trim()
    .optional(),
  name: z
    .string()
    .min(2, "Name must contain 2 at least 2 characters")
    .trim()
    .optional(),
});

export const deleteUserSchema = z.object({
  id: z.string().nonempty("Id is required"),
  username: z
    .string()
    .min(2, "User must contain at least 2 characters")
    .refine((val) => !val.includes(" "), "Username cannot contain spaces"),
  email: z.string().email("Invalid email").trim(),
  password: z
    .string()
    .min(6, "Password must contain 6 characters at least")
    .trim(),
});
