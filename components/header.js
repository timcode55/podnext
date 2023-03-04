import React, { useState, useContext, useEffect } from "react";
import PodList from "./podList";
import Filter from "./filter";
import { array1, array2, categoriesArray } from "../utils/category-list";
import PodcastContext from "../store/podcastContext";
import classes from "./header.module.css";
import axios from "axios";

// import { clientPromise } from "../lib/mongodb";
// import Rating from "../db/Rating";

const Header = (props) => {
  // console.log(props, "props in header");
  const [state, setState] = useContext(PodcastContext);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [numberRatings, setNumberRatings] = useState("");
  // const [podcasts, setPodcasts] = useState(props.podcasts.data.podcasts);
  const [podcasts, setPodcasts] = useState(props.podcasts);
  const [genre, setGenre] = useState("AI & Data Science");
  const [loader, setLoader] = useState(true);
  const [dbCategories, setDbCategories] = useState([]);
  const podcastCtx = useContext(PodcastContext);
  // console.log(podcastCtx, "PODCASTCTX IN HEADER");
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
    getNewPodcasts(categoryId, 1);
    // console.log(podcasts, "PODCASTS FULL LIST");
  };

  async function getNewPodcasts(categoryId, page) {
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
        console.log(
          response.data.data,
          "RESPONSE.DATA IN HEADER FOR GETPODCASTSBYCATEGORY"
        );
        // for (let pod of response.data.data.podcasts) {
        // try {
        // const podcast = Rating.findOne({ id: pod.id }).lean();
        // console.log(podcast, "PODCAST**************");
        // pod["rating"] = response.data.rating;
        //     pod["numberOfRatings"] = response.data.numberOfRatings || "N/A";
        //     pod["itunes"] = response.data.itunes;
        // } catch (e) {
        // console.log(e, "error");
        // }
      });
  }
  // const data = await response.data;
  // console.log(data, "DATA FOR ONCHANGE GETNEWPODCASTS");

  // Pass data to the page via props
  // return data;

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
      // console.log(getRating, "GETRATING RESULTS FROM DB");
      // await setPodcastRatings([props.data.podcasts]);
    };
    // getRating();
  }, [podcasts]);

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
