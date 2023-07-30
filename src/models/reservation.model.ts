import mongoose, { ObjectId, Schema } from "mongoose";

export enum EStatus {
  pending = "pending",
  canceled = "canceled",
  confirmed = "confirmed",
}

// TS model
export interface IReservation {
  restaurant_id: ObjectId;
  user_id: ObjectId;
  reserve_time: number;
  people_count: number;
  note?: string;
  status: EStatus.pending | EStatus.canceled | EStatus.confirmed;
}

// MONGOOSE model
const reservationSchema = new Schema<IReservation>(
  {
    restaurant_id: {
      ref: "restaurant",
      type: Schema.Types.ObjectId,
    },
    user_id: {
      ref: "user",
      type: Schema.Types.ObjectId,
    },
    reserve_time: Date,
    people_count: Number,
    note: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

// model
const reservationModel = mongoose.model<IReservation>(
  "reservation",
  reservationSchema
);

export default reservationModel;
