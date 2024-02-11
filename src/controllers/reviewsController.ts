import { Request, Response } from "express";
import { ReviewsModel } from "../models/reviewsModel";
import { Review } from "../types";
import { z } from "zod";

const reviewSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .max(100, { message: "Email must be less than 100 characters" })
    .email(),
  review: z.string().max(1000),
});

function validateReview(review: Review) {
  return reviewSchema.safeParseAsync(review);
}

function validateId(id: string) {
  return z
    .string()
    .regex(/^\d{1,5}$/)
    .safeParseAsync(id);
}

export class ReviewsController {
  static async getReviews(_req: Request, res: Response) {
    const reviews = await ReviewsModel.getReviews();
    res.status(200).send(reviews);
  }

  static async postReview(req: Request, res: Response) {
    const checkedBody = await validateReview(req.body);
    if (checkedBody.success) {
      const { email, review } = checkedBody.data;
      const postResponse = await ReviewsModel.postReview({
        email: email,
        review: review,
      });
      res.status(200).json({ response: postResponse });
    } else {
      res.status(400).json(checkedBody.error.issues);
    }
  }

  static async putReview(req: Request, res: Response) {
    const checkedId = await validateId(req.params.id);
    const checkedBody = await validateReview(req.body);
    if (checkedId.success && checkedBody.success) {
      const id = checkedId.data;
      const { email, review } = checkedBody.data;
      const putResponse = await ReviewsModel.putReview({ id, email, review });
      res.status(200).json({ response: putResponse });
    }
    if (!checkedId.success) {
      res.status(400).json(checkedId.error.issues);
    }
    if (!checkedBody.success) {
      res.status(400).json(checkedBody.error.issues);
    }
  }

  static async deleteReview(req: Request, res: Response) {
    const checkedId = await validateId(req.params.id);
    if (checkedId.success) {
      const id = checkedId.data;
      const deleteResponse = await ReviewsModel.deleteReview(id);
      res.status(200).json({ response: deleteResponse });
    } else {
      res.status(400).json(checkedId.error.issues);
    }
  }
}
