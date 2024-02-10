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
  res.status(200).json({ response: postResponse });
});

reviewsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { email, review } = req.body;
  const putResponse = await ReviewsModel.putReview({ id, email, review });
  res.status(200).json({ response: putResponse });
});

reviewsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleteResponse = await ReviewsModel.deleteReview(id);
  res.status(200).json({ response: deleteResponse });
});

export default reviewsRouter;
