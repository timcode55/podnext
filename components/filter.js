import classes from "./filter.module.css";
import PodcastContext from "../store/podcastContext";
import { categoriesArray } from "../utils/category-list";
import { useState, useContext } from "react";
import axios from "axios";
// import { connectToDatabase } from "../utils/mongodb";

// import Rating from "../db/Rating";
// import connectDB from "../db/mongoose";
// import { Rating } from "../models/Rating";

const Filter = (props) => {
  console.log(props, "PROPS IN FILTER FROM GSSP");
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
    // podcastCtx.setRating(e.target.value);
  };
  const handleNumberRatingsInput = (e) => {
    e.preventDefault();
    setNumberRatings(e.target.value);
    // podcastCtx.setNumberRatings(e.target.value);
  };

  const handleGenreInput = (e) => {
    e.preventDefault();
    console.log(e.target.value, "VALUE IN SELECT BOX IN GENRE 71**");
    setGenre(e.target.value);
    // if (!e.target.value) {
    //   podcastCtx.setGenre("AI & Data Science");
    // } else {
    //   podcastCtx.setGenre(e.target.value);
    // }
  };

  const handleClick = async (e) => {
    console.log(rating, "rating on click");
    console.log(genre, "genre on click");
    console.log(numberRatings, "numberRatings on click");
    let stringGenre = encodeURIComponent(genre);
    console.log(stringGenre, "stringGenre");
    e.preventDefault();
    axios
      .get(
        `/api/getTopPodcasts?rating=${rating}&numberRatings=${numberRatings}&genre=${genre}`,
        {
          body: {
            todo: { rating },
          },
        }
      )
      .then(function (response) {
        let result = response.data.data.sort((a, b) =>
          a.rating > b.rating ? 1 : -1
        );
        console.log(result, "RESULT");
        // response.data,

        // setTopPodcasts(response.data);
        podcastCtx.setRecommend(result);
        // setRating("");
        // setNumberRatings("");
      })
      .catch(function (error) {
        console.log(error, "ERROR IN FILTER.JS");
      });
    // connectToDatabase();
    // await axios
    //   .post(
    //     `http://localhost:8000/getTopPodcasts?rating=${rating}&numberRatings=${numberRatings}&genre=${genre}`,
    //     {
    //       body: {
    //         todo: { rating },
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     const recommendedPodcasts = response.data.sort((a, b) =>
    //       a.rating > b.rating ? 1 : -1
    //     );
    //     console.log(
    //       response.data.sort((a, b) => (a.rating > b.rating ? 1 : -1)),
    //       "*********************response.data 29 in Header"
    //     );
    //     podcastCtx.setRecommend(recommendedPodcasts);
    //     setRating("");
    //     setNumberRatings("");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // async function addTest(req, res) {
    //   try {
    //     console.log("CONNECTING TO MONGO");
    //     await clientPromise;
    //     console.log("CONNECTED TO MONGO");

    //     console.log("CREATING DOCUMENT");
    //     const test = await Test.create(req.body);
    //     console.log("CREATED DOCUMENT");

    //     res.json({ test });
    //   } catch (error) {
    //     console.log(error);
    //     res.json({ error });
    //   }
    // }

    // addTest();
    // const topPodcasts = await Rating.find({
    //   rating: { $gte: rating },
    //   numberOfRatings: { $gte: numberRatings },
    //   listenNotesGenre: genre,
    //   // genre
    // }).lean();

    // console.log(topPodcasts, "TOPPODCASTS FROM DB IN FILTER*****");
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
              value={rating}
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
              value={numberRatings}
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
