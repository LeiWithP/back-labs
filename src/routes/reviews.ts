import { Router } from "express";
import { ReviewsModel } from "../models/reviewsModel";
import { z } from "zod";
import { Review } from "../types";

const reviewsRouter = Router();

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

reviewsRouter.get("/", async (_req, res) => {
  const reviews = await ReviewsModel.getReviews();
  res.status(200).send(reviews);
});

reviewsRouter.post("/", async (req, res) => {
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
});

reviewsRouter.put("/:id", async (req, res) => {
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
});

reviewsRouter.delete("/:id", async (req, res) => {
  const checkedId = await validateId(req.params.id);
  if (checkedId.success) {
    const id = checkedId.data;
    const deleteResponse = await ReviewsModel.deleteReview(id);
    res.status(200).json({ response: deleteResponse });
  } else {
    res.status(400).json(checkedId.error.issues);
  }
});

export default reviewsRouter;
