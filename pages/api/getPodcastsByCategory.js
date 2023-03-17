import axios from "axios";
import { connectToDatabase, getClient } from "../../helpers/database/mongodb";

export default async function handler(req, res) {
  const categoryId = req.query.categoryId;
  const page = req.query.page;
  // console.log(categoryId, page, req.method, "handler values");

  if (req.method === "GET") {
    let mongoClient;
    try {
      mongoClient = getClient() || (await connectToDatabase());
    } catch (error) {
      return res.status(401).json({
        message: "Sorry, DB is not working",
      });
    }
    try {
      const db = mongoClient.db();
      const getTopPods = db.collection("ratings");

      const response = await axios.get(
        `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${categoryId}&page=${page}&region=us&safe_mode=0`,
        {
          headers: {
            "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
          },
        }
      );
      console.log("testing", "TEST LET IT WORK");
      const finalArray = [];
      for (let pod of response.data.podcasts) {
        const result = await getTopPods.find({ id: pod.id }).toArray();
        console.log(JSON.parse(JSON.stringify(result)), "RESULT FROM DB");
        if (result.length > 0) {
          pod.rating = result[0].rating;
          pod.numberOfRatings = result[0].numberOfRatings;
          pod.itunes = result[0].itunes;
        } else {
          pod.rating = null;
          pod.numberOfRatings = null;
          pod.itunes = null;
        }

        finalArray.push(pod);
      }
      res.status(200).json({ data: finalArray });
    } catch (err) {
      res.status(401).json({ message: "Shit did not work" });
    }
  }
}
