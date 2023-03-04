import { useContext, useState } from "react";
import PodcastContext from "../../store/podcastContext";
import Header from "../../components/header";
import classes from "./podcasts.module.css";
import axios from "axios";
import { connectToDatabase } from "../../helpers/database/mongodb";

function Podcasts(props) {
  const podcastCtx = useContext(PodcastContext);

  return (
    <div className={classes.mainContainer}>
      {props.isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}
      <Header podcasts={props?.finalArray} />
    </div>
  );
}

export async function getStaticProps() {
  let mongoClient;
  try {
    mongoClient = await connectToDatabase();
  } catch (error) {
    return res.status(401).json({
      message: "Sorry, DB is not working",
    });
  }
  try {
    const db = mongoClient.db();
    const getTopPods = db.collection("ratings");
    const response = await axios.get(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${67}&page=${1}&region=us&safe_mode=0`,
      {
        headers: {
          "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
        },
      }
    );
    console.log("testing", "TEST LET IT WORK");
    const finalArray = [];
    for (const pod of response.data.podcasts) {
      const result = await getTopPods.findOne({ id: pod.id });
      console.log(JSON.parse(JSON.stringify(result)), "RESULT FROM DB");
      pod.rating = result?.rating ?? null;
      pod.numberOfRatings = result?.numberOfRatings ?? null;
      finalArray.push(pod);
    }
    return {
      props: { isConnected: true, finalArray },
    };
  } catch (error) {
    console.log(error, "error");
    return { props: { isConnected: false } };
  }
}

export default Podcasts;
