import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  console.log(req.method, "REQ.METHOD");
  console.log(req.query.rating, "req.query.rating");
  console.log(typeof req.query.rating, "TYPEOF req.query.genre");
  console.log(req.query.numberRatings, "req.query.#");
  console.log(typeof req.query.numberRatings, "TYPEOF req.query.genre");
  console.log(req.query.genre, "req.query.genre");
  console.log(typeof req.query.genre, "TYPEOF req.query.genre");

  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();

      const getTopPods = db.collection("ratings");

      const result = await getTopPods
        .find({
          rating: { $gte: Number(req.query.rating) },
          numberOfRatings: { $gte: Number(req.query.numberRatings) },
          listenNotesGenre: req.query.genre,
        })
        .toArray();

      console.log(result, "gettoppodcasts from Mongodb");

      client.close();

      res
        .status(201)
        .json({ message: "Top Podcasts Successfully found", data: result });
    } catch (e) {
      res
        .status(500)
        .json({ error: "There was an error getting the Top Podcasts" });
    }
  }
}
