import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
  title: { type: String, index: true, unique: true, dropDups: true },
  id: String,
  rating: Number,
  image: String,
  numberOfRatings: Number,
  genre: String,
  description: String,
  website: String,
  itunes: String,
  itunesid: Number,
  listennotesurl: String,
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default Rating;
