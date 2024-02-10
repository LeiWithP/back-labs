import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import reviewsRouter from "./routes/reviews";

configDotenv();

const app = express();

const PORT = process.env.APP_PORT;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Created by Pedro Uziel Barrita Licea");
});

app.use("/reviews", reviewsRouter);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
