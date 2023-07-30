import mongoose, { Schema } from "mongoose";

export interface IMenu {
  title: string;
  imageURL: string;
  price: number;
}

// TypeScript da tiplash
export interface IRestaurant {
  title: string;
  desc: string;
  open_time: string;
  close_time: string;
  rating: number;
  address: string;
  photos: string[];
  latLng: {
    type: string;
    coordinates: [number, number];
  };
  menu: IMenu[];
}

// Mongoose da tiplash
const restaurantSchema = new Schema<IRestaurant>(
  {
    title: {
      type: String,
      required: true,
    },
    desc: String,
    open_time: String,
    close_time: String,
    rating: Number,
    address: String,
    photos: [String],
    latLng: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    menu: [
      {
        title: String,
        imageURL: String,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// MODEl yaratish
const restaurantModel = mongoose.model<IRestaurant>(
  "restaurant",
  restaurantSchema
);

export default restaurantModel;
