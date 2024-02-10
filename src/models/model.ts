import { configDotenv } from "dotenv";

configDotenv();

const dbPort = process.env.DATABASE_PORT;
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: dbPort ? parseInt(dbPort) : 5432,
});
