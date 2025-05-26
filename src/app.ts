import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { linkRouter } from "./modules/link/link.routes";
import { userRouter } from "./modules/user/user.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 50,
  message: "Too many requests, try again later",
});

export const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["https://linkgrid.site"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(limiter);

app.use("/api/users", userRouter);
app.use("/api/links", linkRouter);

app.use(errorMiddleware);
