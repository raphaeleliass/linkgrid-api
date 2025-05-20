import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import {
  createLinkSchema,
  deleteLinkSchema,
  updateLinkSchema,
} from "./link.schemas";
import { LinkController } from "./link.controller";

export const linkRouter = Router();

linkRouter.post(
  "/create",
  authMiddleware,
  validationMiddleware(createLinkSchema),
  LinkController.createLink
);

linkRouter.put(
  "/update",
  authMiddleware,
  validationMiddleware(updateLinkSchema),
  LinkController.updateLink
);

linkRouter.delete(
  "/delete",
  authMiddleware,
  validationMiddleware(deleteLinkSchema),
  LinkController.deleteLink
);
