import React, { useState, useContext, useEffect } from "react";
import PodList from "./podList";
import Filter from "./filter";
import { array1, array2, categoriesArray } from "../utils/category-list";
import PodcastContext from "../store/podcastContext";
import classes from "./header.module.css";
import axios from "axios";

const Header = (props) => {
  console.log(props, "props in header");
  const [state, setState] = useContext(PodcastContext);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [numberRatings, setNumberRatings] = useState("");
  // const [podcasts, setPodcasts] = useState(props.podcasts.data.podcasts);
  const [podcasts, setPodcasts] = useState(null);
  const [genre, setGenre] = useState("AI & Data Science");
  const [loader, setLoader] = useState(true);
  const [dbCategories, setDbCategories] = useState([]);
  const podcastCtx = useContext(PodcastContext);
  console.log(podcastCtx, "PODCASTCTX IN HEADER");
  //   const [state, setState] = useContext(PodcastContext);

  const handleChange = (e) => {
    setValue(e.target.value);
    // setState({ page: 1, category: e.target.value });
    let findValue = Number(e.target.value);
    let categoryName = categoriesArray.find(
      (item) => item.id === findValue
    ).name;
    let categoryId = categoriesArray.find((item) => item.id === findValue).id;
    setCategory(categoryName, categoryId);
    podcastCtx.setCategory(categoryName, categoryId);
    getNewPodcasts(categoryId);
  };

  async function getNewPodcasts(categoryId) {
    const response = await fetch(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${categoryId}&page=${1}&region=us&safe_mode=0`,
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
    console.log(data, "DATA IN select box change");
    podcastCtx.setPodcasts(data.podcasts);
    setPodcasts(data.podcasts);

    // Pass data to the page via props
    return data;
  }

  return (
    <div>
      <div className={classes.headerContainer}>
        <h1 className={classes.title}>
          TOP PODCASTS -{" "}
          {category.toUpperCase() || "most popular".toUpperCase()}
        </h1>
        <div className={classes.selectionBoxContainer}>
          <div className={classes.selectionBox}>
            <form>
              <label>
                <span>Choose a Genre (A - M) </span>
              </label>
              <select
                id="selection"
                name="scripts"
                onChange={handleChange}
                className={classes.selection}
              >
                {array1.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>

          <div className={classes.selectionBox}>
            <form>
              <label>
                <span className={classes.dropdownTitle}>
                  Choose a Genre (M - Z){" "}
                </span>
                <select
                  id="selection2"
                  name="scripts"
                  onChange={handleChange}
                  className={classes.selection}
                >
                  {array2.map((item) => {
                    return (
                      <option
                        className={classes.option}
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </form>
          </div>
        </div>
        <div className={classes.filterWrapper}>
          {/* <Filter handleClick={handleClick} /> */}
        </div>
      </div>
      <PodList
        podcasts={podcasts}
        category={parseInt(value)}
        getData={props.getApiData}
        status={props.status}
        cache={props.cache}
      />
    </div>
  );
};

export default Header;
