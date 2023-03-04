// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }
import { connectToDatabase, getClient } from "../../helpers/database/mongodb";
// import { MongoClient } from "mongodb";
// import { connectToDatabase } from "../../lib/mongodb";

// import Rating from "../../models/Rating";

// import { connectToDatabase } from "../../helpers/database/mongodb";

export default async function handler(req, res) {
  // const { db } = await connectToDatabase();
  let id = req.query.id;
  console.log(id, "ID SENT TO GETRATINGS FUNCTION API");
  console.log(typeof id, "typeof id");

  // const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DATABASE);
  let mongoClient;
  try {
    mongoClient = getClient() || (await connectToDatabase());
  } catch (error) {
    res.status(500).json({ message: "Could not connect to the DB" });
    return;
  }

  const db = mongoClient.db();
  const getRatingData = db.collection("ratings");

  if (req.method === "GET") {
    // const db = client.db();
    try {
      //   const topPodcasts = await db.collection("ratings").findOne({
      // const getRatings = await db.collection("ratings").findOne({ id: id });
      const getRatings = await getRatingData.findOne({ id: id });
      // .lean()
      // .toArray();
      console.log(getRatings, "GETRATINGS FOR EACH ID***********");
      //   const podcast = await Rating.findOne({ id }).lean();
      res.status(200).json({ data: getRatings });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Error finding the podcast in the database" });
    }
    res
      .status(201)
      .json({ message: "podcast successfully found in the database" });
  }
  //   let rating = req.query.rating;
  //   let numberRatings = req.query.numberRatings;
  //   let genre = req.query.genre;

  //   await db.collection("Rating");
  //   if (req.method === "GET") {
  //     res.status(200).json({ success: true });
  //   }

  //   client.close();
}

// try {
// await clientPromise
// `await clientPromise` will use the default database passed in the MONGODB_URI
// However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
//
// const { client } = await connectToDatabase();
// const db = client.db("ratings");
//
// Then you can execute queries against your database like so:
// db.find({}) or any of the MongoDB Node Driver commands

//   return {
//     props: { isConnected: true },
//   };
// } catch (e) {
//   console.error(e);
//   return {
//     props: { isConnected: false },
//   };
// }
