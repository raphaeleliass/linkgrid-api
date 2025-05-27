import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { linkRouter } from "./modules/link/link.routes";
import { userRouter } from "./modules/user/user.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

// Adicione este middleware de log ANTES de qualquer outra coisa para ver as requisições chegando
app.use((req, res, next) => {
  console.log(`[LOG INICIAL] Método: ${req.method}, URL: ${req.url}, Origem: ${req.headers.origin}`);
  next();
});

app.use(helmet());

const corsOptions = {
  origin: function (origin:any, callback:any) {
    console.log(`[CORS] Origem da requisição: ${origin}`); // Log da origem recebida pelo CORS
    const allowedOrigins = [
      "https://linkgrid.site",
      "https://linkgrid-web.vercel.app",
      "https://www.linkgrid.site",
      "http://localhost:3000", // Adicione se estiver testando localmente o frontend
      // "https://linkgrid-api.vercel.app", // Geralmente não é necessário para o frontend acessar
    ];

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      console.log(`[CORS] Origem permitida: ${origin}`);
      callback(null, true); // Permite a origem
    } else {
      console.log(`[CORS] Origem NÃO permitida: ${origin}`);
      callback(new Error("Not allowed by CORS")); // Bloqueia a origem
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "Accept",
    "X-Requested-With",
  ],
  exposedHeaders: ["Content-Length", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 200, // Garante 200 OK para OPTIONS
  maxAge: 86400,
};

app.use(cors(corsOptions));

// Middleware de log APÓS o CORS para ver os cabeçalhos da resposta (se definidos)
// Isso é mais útil se preflightContinue fosse true, mas pode dar alguma pista.
app.use((req, res, next) => {
  // Verifica se os cabeçalhos CORS foram definidos na resposta
  // Especialmente útil para a própria requisição OPTIONS se o CORS a manipulou.
  if (req.method === 'OPTIONS' && res.headersSent) {
    console.log('[LOG PÓS-CORS] Cabeçalhos da resposta para OPTIONS:', res.getHeaders());
  } else if (res.headersSent) {
    // Para outras requisições, apenas logue que os cabeçalhos foram enviados
    // console.log(`[LOG PÓS-CORS] Cabeçalhos da resposta para ${req.method} ${req.url}:`, res.getHeaders());
  }
  next();
});


app.use(express.json());

// Configuração do Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  limit: 100, // Limite cada IP a 100 requisições por `window` (por hora)
  message: "Too many requests from this IP, please try again after an hour",
  // Importante: Pular requisições OPTIONS para não interferir com o preflight do CORS
  skip: (req) => req.method === 'OPTIONS',
});
app.use(limiter); // Aplicar o rate limiter

// Suas rotas
app.use("/api/users", userRouter);
app.use("/api/links", linkRouter);

// Middleware de erro
app.use(errorMiddleware);
