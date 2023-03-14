import { useContext, useState } from "react";
import PodcastContext from "../../store/podcastContext";
import Header from "../../components/header";
import Filter from "../../components/filter";
import classes from "./podcasts.module.css";
import axios from "axios";
import { connectToDatabase, getClient } from "../../helpers/database/mongodb";

function Podcasts(props) {
  const podcastCtx = useContext(PodcastContext);
  // console.log(podcastCtx.recommend, "podcastCtx.recommend");

  return (
    <div className={classes.mainContainer}>
      {/* {props.isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )} */}
      <Filter podcasts={podcastCtx.recommend} />
      <Header podcasts={props?.finalArray} />
    </div>
  );
}

export async function getStaticProps() {
  let mongoClient;
  try {
    mongoClient = getClient();
  } catch (error) {
    console.log(error, "ERROR GETTING MONGO CLIENT*****");
  }
  if (!mongoClient) {
    mongoClient = await connectToDatabase();
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
    const finalArray = [];
    for (const pod of response.data.podcasts) {
      const result = await getTopPods.findOne({ id: pod.id });
      // console.log(JSON.parse(JSON.stringify(result)), "RESULT FROM DB");
      pod.rating = result?.rating ?? null;
      pod.numberOfRatings = result?.numberOfRatings ?? null;
      finalArray.push(pod);
    }
    return {
      props: { isConnected: true, finalArray },
    };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return { props: { isConnected: false } };
  }
}

export default Podcasts;
