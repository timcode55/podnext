import classes from "./filter.module.css";
import PodcastContext from "../store/podcastContext";
import { categoriesArray } from "../utils/category-list";
import { useState, useContext } from "react";
import axios from "axios";

const Filter = () => {
  const [rating, setRating] = useState("");
  const [numberRatings, setNumberRatings] = useState("");
  const [topPodcasts, setTopPodcasts] = useState(null);
  const [genre, setGenre] = useState("AI & Data Science");
  const [loader, setLoader] = useState(true);
  const podcastCtx = useContext(PodcastContext);
  console.log(podcastCtx, "PODCASTCTX IN FILTER");

  const handleChange = (e) => {
    setValue(e.target.value);
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

  const handleRatingInput = (e) => {
    e.preventDefault();
    setRating(e.target.value);
  };
  const handleNumberRatingsInput = (e) => {
    e.preventDefault();
    setNumberRatings(e.target.value);
  };

  const handleGenreInput = (e) => {
    e.preventDefault();
    console.log(e.target.value, "VALUE IN SELECT BOX IN GENRE 71**");
    setGenre(e.target.value);
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
        const recommendedPodcasts = response.data.sort((a, b) =>
          a.rating > b.rating ? 1 : -1
        );
        console.log(
          response.data.sort((a, b) => (a.rating > b.rating ? 1 : -1)),
          "*********************response.data 29 in Header"
        );
        // setTopPodcasts(
        //   response.data.sort((a, b) => (a.rating > b.rating ? 1 : -1))
        // );
        podcastCtx.setRecommend(recommendedPodcasts);
        setRating("");
        setNumberRatings("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={classes.filterContainer}>
      <form className={classes.formWrapper}>
        <div className={classes.formItem}>
          <label>
            <p>Enter Min Rating</p>
            <input
              className={classes.filterInput}
              type="text"
              name="rating"
              //   value={rating}
              onChange={handleRatingInput}
            />
          </label>
        </div>
        <div className={classes.formItem}>
          <label>
            <p>Enter # of Ratings</p>
            <input
              className={classes.filterInput}
              type="text"
              name="numberRatings"
              //   value={numberRatings}
              onChange={handleNumberRatingsInput}
            />
          </label>
        </div>
        <div className={classes.filterSelection}>
          <label>
            <p>Genre</p>
            <select id="selection" name="scripts" onChange={handleGenreInput}>
              {categoriesArray.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.filterButton}
            type="submit"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
