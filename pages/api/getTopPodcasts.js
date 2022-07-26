// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

import { MongoClient } from "mongodb";

import Rating from "../../models/Rating";

export default async function handler(req, res) {
  console.log(req.method, "REQ.METHOD");
  console.log(req.query.rating, "req.query.rating");
  console.log(typeof req.query.rating, "TYPEOF req.query.genre");
  console.log(req.query.numberRatings, "req.query.#");
  console.log(typeof req.query.numberRatings, "TYPEOF req.query.genre");
  console.log(req.query.genre, "req.query.genre");
  console.log(typeof req.query.genre, "TYPEOF req.query.genre");

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DATABASE);

  if (req.method === "GET") {
    const db = client.db();
    try {
      //   const topPodcasts = await db.collection("ratings").findOne({
      const topPodcasts = await db
        .collection("ratings")
        .find({
          rating: { $gte: Number(req.query.rating) },
          numberOfRatings: { $gte: Number(req.query.numberRatings) },
          listenNotesGenre: req.query.genre,
          //   rating: { $gte: 4.3 },
          //   numberOfRatings: { $gte: 30 },
          //   genre: "Business",
          //   rating: 4.9,
          // genre
          // id: "b619f0a9a6c14890b0a926d83831d05a",
        })
        .toArray();
      // .lean();
      console.log(topPodcasts, "topPodcasts");
      res.status(200).json({ data: topPodcasts });
    } catch (e) {
      res.status(500).send();
    }
    // res.status(201).json({ message: "post" });
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
