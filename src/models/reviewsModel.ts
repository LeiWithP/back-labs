import { configDotenv } from "dotenv";
import { Pool } from "pg";
import { Review } from "../types";

configDotenv();

const dbPort = process.env.DATABASE_PORT;
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: dbPort ? parseInt(dbPort) : 5432,
});

export class ReviewsModel {
  static async getReviews() {
    try {
      const query = await pool.query("SELECT * FROM reviews");
      const sortedRows = query.rows.sort((a, b) => a.id - b.id);
      return sortedRows;
    } catch (error) {
      throw {
        message: "Error connecting to the Database",
        error: error,
      };
    }
  }

  static async postReview({ email, review }: Review) {
    return new Promise((resolve, reject) => {
      pool
        .query("INSERT INTO reviews (email, review) VALUES ($1, $2)", [
          email,
          review,
        ])
        .then((_) => resolve(`Review for ${email} created successfully`))
        .catch((error) =>
          reject({
            message: "Error connecting to the Database",
            error: error,
          })
        );
    });
  }

  static async putReview({ id, email, review }: Review) {
    return new Promise((resolve, reject) => {
      pool
        .query("UPDATE reviews SET email = $1, review = $2 WHERE id = $3", [
          email,
          review,
          id,
        ])
        .then((_) => resolve(`Review with id ${id} updated successfully`))
        .catch((error) =>
          reject({
            message: "Error connecting to the Database",
            error: error,
          })
        );
    });
  }

  static async deleteReview(id: string) {
    return new Promise((resolve, reject) => {
      pool
        .query("DELETE FROM reviews WHERE id = $1", [id])
        .then((_) => resolve(`Review with id ${id} deleted successfully`))
        .catch((error) =>
          reject({
            message: "Error connecting to the Database",
            error: error,
          })
        );
    });
  }
}
