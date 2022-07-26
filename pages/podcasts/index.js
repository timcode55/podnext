import { useContext, useState } from "react";
import PodcastContext from "../../store/podcastContext";
import Header from "../../components/header";
import classes from "./podcasts.module.css";
import { MongoClient } from "mongodb";
import axios from "axios";

function Podcasts(props) {
  // const { podcasts } = props;
  console.log(props, "PROPS FROM GSP");
  const podcastCtx = useContext(PodcastContext);
  const [podcastsRatings, setPodcastRatings] = useState(props.podcasts);

  const getRating = async () => {
    for (let pod of props.data.podcasts) {
      const id = pod.id;
      await axios
        .get(`/api/getRatings/?id=${id}`)
        .then(function (response) {
          pod["rating"] = response.data.rating;
          pod["numberOfRatings"] = response.data.numberOfRatings || "N/A";
          pod["itunes"] = response.data.itunes;
          // pod['description'] = response.data.description;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(getRating, "GETRATING RESULTS FROM DB");
    await setPodcastRatings([props.data.podcasts]);
  };
  getRating();
  return (
    <div className={classes.mainContainer}>
      {/* <ul>
        <ul>
          {props.data.podcasts.map((pod) => (
            <li key={pod.id}>{pod.title}</li>
          ))}
        </ul>
      </ul> */}
      <Header podcasts={podcastsRatings} />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${67}&page=${1}&region=us&safe_mode=0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
      },
      credentials: "same-origin",
    }
  );
  const data = await response.json();
  console.log(data, "DATA IN API CALL");

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DATABASE);
  const db = client.db();

  const yourCollection = db.collection("Rating");

  const yourData = await yourCollection.find().toArray();

  client.close();
  return { props: { data } };
}

export default Podcasts;
