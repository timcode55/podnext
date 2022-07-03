// import icons8 from "../../images/Hashtag-26-52px/icons8-hashtag-52.png";
// import rating from "../../images/Star-24-48px/icons8-star-48.png";
import classes from "./podCard.module.css";

const PodCard = (props) => {
  const { podcast } = props;
  // console.log(podcast, "PODAST DETAILS");

  return (
    <div className={classes.divStyle}>
      <div className={classes.podcontainer}>
        <a href={podcast.listennotes_url} target="_blank" rel="noreferrer">
          <img className={classes.podimage} src={podcast.image} alt="pod1" />
        </a>
        <div className={classes.podtitle}>
          <h1>{podcast.title.substring(0, 52)}</h1>
        </div>
        <div className={classes.desc}>
          <p className={classes.ptext}>
            {podcast.description.substring(0, 200).replace(/(<([^>]+)>)/gi, "")}
            ...
          </p>
        </div>
        <div className={classes.podButtons}>
          {/* <div className={classes.webButton}> */}
          <a href={podcast.website} target="_blank" rel="noreferrer">
            <button className={classes.webButton}>Website</button>
          </a>
          {/* </div> */}
          {/* <div className={classes.webButton}> */}
          <a href={podcast.itunes} target="_blank" rel="noreferrer">
            <button className={classes.webButton}>iTunes Link</button>
          </a>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default PodCard;
