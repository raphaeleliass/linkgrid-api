import { z } from "zod";
import {
  createLinkSchema,
  deleteLinkSchema,
  updateLinkSchema,
} from "./link.schemas";

export type CreateLinkType = z.infer<typeof createLinkSchema>;

export type UpdateLinkType = z.infer<typeof updateLinkSchema>;

export type DeleteLinkType = z.infer<typeof deleteLinkSchema>;
