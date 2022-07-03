import React, { useState } from "react";
import PodList from "./podList";
import Filter from "./filter";
import { array1, array2, categoriesArray } from "../utils/category-list";
// import { PodcastContext } from "../context/podcastContext";
import classes from "./header.module.css";

const Header = (props) => {
  //   const [state, setState] = useContext(PodcastContext);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    setState({ page: 1, category: e.target.value });
    let findValue = Number(e.target.value);
    let findCategory = categoriesArray.find(
      (item) => item.id === findValue
    ).name;
    setCategory(findCategory);
    if (props.cache[0][`${e.target.value}`]) {
      props.renderCache(e.target.value);
    } else {
      props.getApiData(e.target.value, 1);
    }
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
                  //   onChange={handleChange}
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
          <Filter />
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
