import { useContext } from "react";
import Filter from "../../components/filter";
import PodList from "../../components/podList";
import classes from "./recommend.module.css";
import PodcastContext from "../../store/podcastContext";
// import axios from "axios";
// import getTopPodcastsHandler from "../api/getTopPodcasts";
// import dbConnect from "../../utils/mongodb";
// import Rating from "../../models/Rating";
import { MongoClient } from "mongodb";

export default function Recommend(props) {
  console.log(props, "props in recoomend from DB");
  const podcastCtx = useContext(PodcastContext);
  console.log(podcastCtx, "PODCASTCTX IN recommend.js");
  // getTopPodcastsHandler();
  // connectDB();
  // dbConnect();
  // const getData = async () => {
  //   let rating = podcastCtx.rating;
  //   let numberRatings = podcastCtx.numberRatings;
  //   let genre = podcastCtx.genre;
  // };
  // getData();

  return (
    <div className={classes.mainContainer}>
      <h1>Recommend Page</h1>
      <Filter />
      {podcastCtx.recommend && <PodList podcasts={podcastCtx.recommend} />}
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DATABASE);
  const db = client.db();

  const yourCollection = db.collection("Rating");

  const yourData = await yourCollection.find().toArray();

  client.close();

  return {
    props: {},
  };
}
