// import PodCard from "../../components/podCard";
import axios from "axios";
import { MongoClient } from "mongodb";

// import NextCors from "nextjs-cors";

// import Rating from "../../helpers/mongoose/rating.model";
// const { Client } = require("podcast-api");

import { connectToDatabase } from "../../helpers/database/mongodb";

export default async function handler(req, res) {
  // let mongoClient;
  const categoryId = req.query.categoryId;
  const page = req.query.page;
  console.log(categoryId, page, req.method, "handler values");

  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  // if (req.method === "GET") {
  // const client = await MongoClient.connect(process.env.MONGODB_URI);
  // const db = client.db();

  // const findPod = db.collection("ratings");
  if (req.method === "GET") {
    let mongoClient;
    try {
      mongoClient = await connectToDatabase();
    } catch (error) {
      return res.status(401).json({
        message: "Sorry, DB is not working",
      });
    }
    try {
      // mongoClient = await connectToDatabase();
      // const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = mongoClient.db();

      const getTopPods = db.collection("ratings");
      const response = await axios.get(
        `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${categoryId}&page=${page}&region=us&safe_mode=0`,
        {
          headers: {
            "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
          },
          // credentials: "same-origin",
        }
      );
      console.log("testing", "TEST LET IT WORK");
      const finalArray = [];
      for (let pod of response.data.podcasts) {
        // console.log(pod, "POD.ID");/
        const result = await getTopPods.find({ id: pod.id }).toArray();
        console.log(JSON.parse(JSON.stringify(result)), "RESULT FROM DB");
        // console.log(result, "RESULT TESTING******");
        if (result.length > 0) {
          pod.rating = result[0].rating;
          pod.numberOfRatings = result[0].numberOfRatings;
        } else {
          pod.rating = null;
          pod.numberOfRatings = null;
        }

        finalArray.push(pod);
      }

      // client.close();
      // console.log(response.data, "response.data.podcast*****");
      // console.log(finalArray, "FINALARRAY");
      res.status(200).json({ data: finalArray });
    } catch (err) {
      res.status(401).json({ message: "Shit did not work" });
    }
  }
}
