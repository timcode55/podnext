import React from "react";
import PodCard from "./podCard";
import classes from "./podList.module.css";
// import Arrow from "../arrow/Arrow";

const PodList = (props) => {
  // console.log(props, "props in podlist");
  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <div className={classes.podcastDisplay}>
          {props.podcasts.data.podcasts ? (
            props.podcasts.data.podcasts.map((pod) => (
              // <li key={pod.id}>{pod.title}</li>
              <PodCard key={pod.id} podcast={pod} />
            ))
          ) : (
            <div id="preloader">
              <div id="loader" />
            </div>
          )}
        </div>
      </div>
      {props.status === "loaded" ? <Arrow getData={props.getData} /> : null}
    </div>
  );
};

export default PodList;
