import arrow from "./arrow.module.css";
import PodcastContext from "../store/podcastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/fontawesome-free-solid";

const Arrow = (props) => {
  return (
    <div className={arrow.page}>
      <FontAwesomeIcon icon="caret-square-left" className={arrow.arrow_left} />
      <FontAwesomeIcon
        icon="caret-square-right"
        className={arrow.arrow_right}
      />
    </div>
  );
};

export default Arrow;
