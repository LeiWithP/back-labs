import { Router } from "express";
import { configDotenv } from "dotenv";
import { Pool } from "pg";

configDotenv();

const dbPort = process.env.DATABASE_PORT;

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: dbPort ? parseInt(dbPort) : 5432,
});

const reviewsRouter = Router();

reviewsRouter.get("/", async (_req, res) => {
  const query = await pool.query("SELECT * FROM reviews");
  res.status(200).send(query.rows);
});

reviewsRouter.post("/", async (req, res) => {
  const { email, review } = req.body;
  await pool.query("INSERT INTO reviews (email, review) VALUES ($1, $2)", [
    email,
    review,
  ]);
  res.status(200).json({
    message: "Review added successfully",
  });
});

export default reviewsRouter;
