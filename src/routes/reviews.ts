import { Router } from "express";
import { ReviewsModel } from "../models/reviewsModel";

const reviewsRouter = Router();

reviewsRouter.get("/", async (_req, res) => {
  const reviews = await ReviewsModel.getReviews();
  res.status(200).send(reviews);
});

reviewsRouter.post("/", async (req, res) => {
  const { email, review } = req.body;
  const postResponse = await ReviewsModel.postReview({
    email: email,
    review: review,
  });
  res.status(200).json({
    message: "Review added successfully",
    response: postResponse,
  });
});

export default reviewsRouter;
