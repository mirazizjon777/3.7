import { Request, Response } from "express";
import { customRequest } from "../middleware/auth";
import reservationModel from "../models/reservation.model";
import reviewModel from "../models/review.model";
import userModel from "../models/user.model";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewModel.find({});
    res.json(reviews);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const user_id = (req as customRequest).userId;
    const oneReserve = await reservationModel.findOne({
      user_id,
      restaurant_id: req.body.restaurant_id,
    });
    if (oneReserve) {
      const user = await userModel.findOne({ _id: user_id });
      const readyReview = {
        ...req.body,
        user_id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        photoURL: user?.photoURL,
      };
      const new_review = await reviewModel.create(readyReview);
      return res.status(201).json(new_review);
    } else {
      return res
        .status(400)
        .send({ message: "User cannot create a review before reserving" });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const upReview = await reviewModel.updateOne({ _id: id }, req.body);
    res.json(upReview);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const delReview = await reviewModel.deleteOne({ _id: id });
    res.json(delReview);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};
