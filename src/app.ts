import express from "express";
import { userRouter } from "./modules/user/user.routes";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { errorMiddleware } from "./middlewares/error.middleware";
import { linkRouter } from "./modules/link/link.routes";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 50,
  message: "Too many requests, try again later",
});

export const app = express();

app.use(
  cors({
    // origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/links", linkRouter);

app.use(errorMiddleware);
