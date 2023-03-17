import React, { useState, useContext, useEffect } from "react";
import PodList from "./podList";
import { array1, array2, categoriesArray } from "../utils/category-list";
import PodcastContext from "../store/podcastContext";
import classes from "./header.module.css";
import axios from "axios";

const Header = (props) => {
  // console.log(props, "props in header");
  const [state, setState] = useContext(PodcastContext);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [numberRatings, setNumberRatings] = useState("");
  const [podcasts, setPodcasts] = useState(props.podcasts);
  const [genre, setGenre] = useState("AI & Data Science");
  const [loader, setLoader] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);
  const [mostRecentUpdate, setMostRecentUpdate] = useState("podcasts");
  const podcastCtx = useContext(PodcastContext);

  const handleChange = (e) => {
    setValue(e.target.value);
    let findValue = Number(e.target.value);
    let categoryName = categoriesArray.find(
      (item) => item.id === findValue
    ).name;
    let categoryId = categoriesArray.find((item) => item.id === findValue).id;
    setCategory(categoryName, categoryId);
    podcastCtx.setCategory(categoryName, categoryId);
    getNewPodcasts(categoryId, 1);
  };

  async function getNewPodcasts(categoryId, page) {
    podcastCtx.setLoader(true);
    console.log(categoryId, page, "categoryid, page");
    axios
      .get(`/api/getPodcastsByCategory?categoryId=${categoryId}&page=${page}`, {
        body: {
          todo: { rating },
        },
      })
      .then((response) => {
        setPodcasts(response.data.data);
        podcastCtx.setPodcasts(response.data.data);
        podcastCtx.setRecentUpdate("podcasts");
        console.log(
          response.data.data,
          "RESPONSE.DATA IN HEADER FOR GETPODCASTSBYCATEGORY"
        );
        podcastCtx.setLoader(false);
      });
  }

  useEffect(() => {
    const getRating = async () => {
      console.log(podcasts, "ARE THE PODCASTS THE RIGHT ONES?");
      for (let pod of podcasts) {
        const id = pod.id;
        console.log(id, "ID IN GETRATING");
        await axios
          .get(`/api/getRatings/?id=${id}`)
          .then(function (response) {
            console.log(response.data.data.rating, "RESPONSE8888*******");
            pod["rating"] = response.data.data.rating;
            pod["numberOfRatings"] =
              response.data.data.numberOfRatings || "N/A";
            pod["itunes"] = response.data.data.itunes;
            // pod['description'] = response.data.description;
            console.log(
              response.data.data.rating,
              "RESPONSE.DATA IN INDEX.JS****"
            );
          })
          .then((data) => console.log(data, "DATA IN AXIOS INDEX.JS"))
          .catch(function (error) {
            console.log(error);
          });
        console.log(pod, "POD AFTER UPDATE FOR RATINGS");
      }
    };
  }, [podcasts]);

  useEffect(() => {
    if (podcastCtx.recommend && mostRecentUpdate !== "recommend") {
      setPodcasts(podcastCtx.recommend);
      setMostRecentUpdate("recommend");
    } else if (podcastCtx.podcasts && mostRecentUpdate !== "podcasts") {
      setPodcasts(podcastCtx.podcasts);
      setMostRecentUpdate("podcasts");
    }
  }, [podcastCtx.recommend, podcastCtx.podcasts]);

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
        <div className={classes.filterWrapper}></div>
      </div>
      {loader ? (
        "....loading"
      ) : (
        <PodList
          podcasts={podcasts}
          category={parseInt(value)}
          getData={props.getApiData}
          status={props.status}
          cache={props.cache}
        />
      )}
    </div>
  );
};

export default Header;
