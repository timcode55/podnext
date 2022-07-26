// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

import { MongoClient } from "mongodb";

import Rating from "../../models/Rating";

export default async function handler(req, res) {
  let id = req.query.id;
  console.log(typeof id, "ID SENT TO GETRATINGS FUNCTION API");

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DATABASE);

  if (req.method === "GET") {
    const db = client.db();
    try {
      //   const topPodcasts = await db.collection("ratings").findOne({
      const getRatings = await db
        .collection("ratings")
        .findOne({ id: id })
        .lean();
      console.log(getRatings, "GETRATINGS FOR EACH ID***********");
      //   const podcast = await Rating.findOne({ id }).lean();
      res.send(getRatings);
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
