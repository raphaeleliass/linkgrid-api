import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => console.log(`server on`));
