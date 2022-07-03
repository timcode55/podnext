import classes from "./filter.module.css";
import { array1, array2, categoriesArray } from "../utils/category-list";

const Filter = () => {
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
              //   onChange={handleRatingInput}
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
              //   onChange={handleNumberRatingsInput}
            />
          </label>
        </div>
        <div className={classes.filterSelection}>
          <label>
            <p>Genre</p>
            <select
              id="selection"
              name="scripts"
              // onChange={handleGenreInput}
            >
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
            //   onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
