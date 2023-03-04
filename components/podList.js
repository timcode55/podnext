import { useContext, useState } from "react";
import PodCard from "./podCard";
import classes from "./podList.module.css";
import PodcastContext from "../store/podcastContext";

const PodList = (props) => {
  const [podcasts, setPodcasts] = useState(props.podcasts);
  const PodcastCtx = useContext(PodcastContext);
  console.log(PodcastCtx, "PODCASTCTX IN PODLIST");
  // console.log(props, "props in podlist");
  // // console.log(getPodcasts(67, 1), "getPODCASTS UTIL TEST");
  // let podcasts = getPodcasts(68, 1);
  // PodcastCtx.setPodcasts(podcasts);
  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <div className={classes.podcastDisplay}>
          {props.podcasts &&
            props.podcasts.map((pod) => (
              <div key={pod.id}>
                {/* <li key={pod.id}>{pod.title}</li> */}
                <PodCard key={pod.id} podcast={pod} />
              </div>
            ))}
          {/* {PodcastCtx.recommend ? (
            PodcastCtx.recommend.map((pod) => (
              // <li key={pod.id}>{pod.title}</li>
              <PodCard key={pod.id} podcast={pod} />
            ))
          ) : (
            <div id="preloader">
              <div id="loader" />
            </div>
          )} */}
        </div>
      </div>
      {props.status === "loaded" ? <Arrow getData={props.getData} /> : null}
    </div>
  );
};

// export async function getServerSideProps() {
//   const response = await fetch(
//     `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${67}&page=${1}&region=us&safe_mode=0`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-ListenAPI-Key": process.env.LISTEN_NOTES_API_KEY,
//       },
//       credentials: "same-origin",
//     }
//   );
//   const data = await response.json();
//   console.log(data, "DATA IN API CALL");

//   // Pass data to the page via props
//   return { props: { data } };
// }

export default PodList;
