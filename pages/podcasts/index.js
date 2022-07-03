import { useContext } from "react";
import PodcastContext from "../../store/podcastContext";
import Header from "../../components/header";
import classes from "./podcasts.module.css";

function Podcasts(props) {
  const { podcasts } = props;
  console.log(props, "PROPS FROM GSP");
  const podcastCtx = useContext(PodcastContext);
  return (
    <div className={classes.mainContainer}>
      {/* <ul>
        <ul>
          {props.data.podcasts.map((pod) => (
            <li key={pod.id}>{pod.title}</li>
          ))}
        </ul>
      </ul> */}
      <Header podcasts={props} />
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

  // Pass data to the page via props
  return { props: { data } };
}

export default Podcasts;
