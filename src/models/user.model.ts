import mongoose, { Schema } from "mongoose";

// TS model
export interface IUser {
  first_name: string;
  last_name: string;
  phone: string;
  address?: string;
  password: string;
  photoURL: string;
  latLng: {
    type: string;
    coordinates: [number, number];
  };
}

// Mongoose model
const userSchema = new Schema<IUser>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  phone: String,
  address: String,
  password: String,
  photoURL: String,
  latLng: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
});

// Model
const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;
