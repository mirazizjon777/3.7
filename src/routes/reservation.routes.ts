import express from "express";
import { createReservation } from "../controller/reservation.controller";

const reservationRouter = express.Router();

reservationRouter.get("/", );
reservationRouter.post("/", createReservation);

export default reservationRouter;