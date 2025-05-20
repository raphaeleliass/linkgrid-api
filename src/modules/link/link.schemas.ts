import { z } from "zod";

export const createLinkSchema = z.object({
  title: z.string().nonempty("Title cannot be empty").trim(),
  href: z.string().url().trim(),
  userId: z.string(),
});

export const updateLinkSchema = z.object({
  id: z.string().nonempty("Id is required"),
  title: z.string().nonempty("Title cannot be empty").trim().optional(),
  href: z.string().url("Invalid URL").trim().optional(),
});

export const deleteLinkSchema = z.object({
  id: z.string().nonempty("Id is required"),
});
