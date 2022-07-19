import mongoose from "mongoose";

const connectDB = async () => {
  const db = await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("DB connection was successful!");
};
// test
export default connectDB;
