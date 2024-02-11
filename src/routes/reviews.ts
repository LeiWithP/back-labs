import { Router } from "express";
import { ReviewsController } from "../controllers/reviewsController";

const reviewsRouter = Router();

reviewsRouter.get("/", ReviewsController.getReviews);
reviewsRouter.post("/", ReviewsController.postReview);
reviewsRouter.put("/:id", ReviewsController.putReview);
reviewsRouter.delete("/:id", ReviewsController.deleteReview);

export default reviewsRouter;
