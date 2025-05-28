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

app.use(
  cors({
    origin: [
      "https://linkgrid.site",
      "https://www.linkgrid.site",
      "https://linkgrid.vercel.app",
      "https://linkgrid-api.vercel.app",
      ...(process.env.NODE_ENV === "development"
        ? ["http://localhost:3000"]
        : []),
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    credentials: true,
    maxAge: 86400, // 24 hours in seconds
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.options("*", cors());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
  })
);
app.use(express.json());
app.use(limiter);

app.use("/api/users", userRouter);
app.use("/api/links", linkRouter);

app.use(errorMiddleware);
