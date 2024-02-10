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

interface Review {
  email: string;
  review: string;
}

export class ReviewsModel {
  static async getReviews() {
    const query = await pool.query("SELECT * FROM reviews");
    return query.rows;
  }

  static async postReview({ email, review }: Review) {
    return new Promise((resolve, reject) => {
      pool
        .query("INSERT INTO reviews (email, review) VALUES ($1, $2)", [
          email,
          review,
        ])
        .then((_) => resolve(`Review for ${email} created successfully`))
        .catch((error) => reject("Create Review Error: " + error));
    });
  }
}
