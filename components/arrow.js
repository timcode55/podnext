import React, { useContext } from "react";
import arrow from "./arrow.module.css";
import PodcastContext from "../store/podcastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/fontawesome-free-solid";

const Arrow = (props) => {
  return (
    <div className="page">
      <FontAwesomeIcon icon="caret-square-left" />
      <FontAwesomeIcon icon="caret-square-right" className="arrow-right" />
    </div>
  );
};

export default Arrow;
