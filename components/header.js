import React, { useState, useContext, useEffect } from "react";
import PodList from "./podList";
import Filter from "./filter";
import { array1, array2, categoriesArray } from "../utils/category-list";
import PodcastContext from "../store/podcastContext";
import classes from "./header.module.css";
import axios from "axios";

const Header = (props) => {
  const [state, setState] = useContext(PodcastContext);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [numberRatings, setNumberRatings] = useState("");
  const [topPodcasts, setTopPodcasts] = useState(null);
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
    let findCategoryName = categoriesArray.find(
      (item) => item.id === findValue
    ).name;
    let findCategoryId = categoriesArray.find(
      (item) => item.id === findValue
    ).id;
    setCategory(findCategoryName, findCategoryId);
    podcastCtx.setCategory(findCategoryName, findCategoryId);
  };

  // axios.post('http://localhost:7000/todos', {
  // 	todo: 'Buy the milk'
  // });

  useEffect(() => {
    categoriesArray.unshift({ id: 0, name: "", parent_id: 0 });
    setTimeout(() => setLoader(false), 6000);
  }, []);

  useEffect(() => {
    const getDbCategories = async (e) => {
      // e.preventDefault();
      await axios
        .get(`https://localhost:8000/getDbCategories`)
        .then(function (response) {
          setDbCategories(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getDbCategories();
  }, []);

  //   const handleChange = (e) => {
  //     setLoader(true);
  //     setState({ page: 1, category: e.target.value });
  //     let findValue = Number(e.target.value);
  //     let findCategory = categoriesArray.find(
  //       (item) => item.id === findValue
  //     ).name;
  //     setCategory(findCategory);
  //     props.getApiData(e.target.value, 1);
  //     setTopPodcasts("");
  //     setLoader(false);
  //   };

  const handleRatingInput = (e) => {
    e.preventDefault();
    setRating(e.target.value);
    // setNumberRatings({ [e.target.name]: value });
    // console.log(value, 'rating in Header');
    // props.getTopPodcasts(value, 100);
  };
  const handleNumberRatingsInput = (e) => {
    e.preventDefault();
    setNumberRatings(e.target.value);
    // setNumberRatings({ [e.target.name]: value });
    // console.log(value, 'rating in Header');
    // props.getTopPodcasts(value, 100);
  };

  const handleGenreInput = (e) => {
    e.preventDefault();
    console.log(e.target.value, "VALUE IN SELECT BOX IN GENRE 71**");
    setGenre(e.target.value);
    // setNumberRatings({ [e.target.name]: value });
    // console.log(value, 'rating in Header');
    // props.getTopPodcasts(value, 100);
  };

  const handleClick = async (e) => {
    console.log(rating, "rating on click");
    console.log(genre, "genre on click");
    console.log(numberRatings, "numberRatings on click");
    let stringGenre = encodeURIComponent(genre);
    console.log(stringGenre, "stringGenre");
    e.preventDefault();
    await axios
      .post(
        `http://localhost:8000/getTopPodcasts?rating=${rating}&numberRatings=${numberRatings}&genre=${genre}`,
        {
          body: {
            todo: { rating },
          },
        }
      )
      .then(function (response) {
        console.log(
          response.data.sort((a, b) => (a.rating > b.rating ? 1 : -1)),
          "*********************response.data 29 in Header"
        );
        setTopPodcasts(response.data);
        setRating("");
        setNumberRatings("");
      })
      .catch(function (error) {
        console.log(error);
      });
    // const value = e.target.value;
    // setRating(value);

    // setNumberRatings({ [e.target.name]: value });
    // console.log(rating, 'rating in Header');
    // console.log(rating, 'rating in Header');
    // props.getTopPodcasts(value, 100);
  };

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
          <Filter
            handleRatingInput={handleRatingInput}
            handleNumberRatingsInput={handleNumberRatingsInput}
            handleGenreInput={handleGenreInput}
            handleClick={handleClick}
          />
        </div>
      </div>
      <PodList
        podcasts={props.podcasts}
        category={parseInt(value)}
        getData={props.getApiData}
        status={props.status}
        cache={props.cache}
      />
    </div>
  );
};

export default Header;
