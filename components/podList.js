import { useContext, useState } from "react";
import PodCard from "./podCard";
import classes from "./podList.module.css";
import PodcastContext from "../store/podcastContext";

const PodList = (props) => {
  const [podcasts, setPodcasts] = useState(props.podcasts);
  const PodcastCtx = useContext(PodcastContext);
  console.log(PodcastCtx, "PODCASTCTX IN PODLIST");
  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <div className={classes.podcastDisplay}>
          {props.podcasts &&
            props.podcasts.map((pod) => (
              <div key={pod.id}>
                <PodCard key={pod.id} podcast={pod} />
              </div>
            ))}
        </div>
      </div>
      {props.status === "loaded" ? <Arrow getData={props.getData} /> : null}
    </div>
  );
};

export default PodList;
