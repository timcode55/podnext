import { createContext, useState } from "react";

const PodcastContext = createContext({
  podcasts: [],
  setCategory: function () {},
  showLoader: false,
});

export function PodcastContextProvider(props) {
  const [podcasts, setPodcasts] = useState([]);
  const [category, setCategory] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [loader, setLoader] = useState(null);

  function setCategoryHandler(categoryName, categoryId) {
    console.log(category, "CATEGORY IN setCategoryHandler");
    setCategory({ page: 1, category: categoryName, id: categoryId });
  }

  function setPodcastsHandler(podcasts) {
    setPodcasts(podcasts);
  }

  function setLoaderHandler(isLoading) {
    setLoader(isLoading);
  }

  function setRecommendHandler(podcasts) {
    setRecommend(podcasts);
  }

  const context = {
    podcasts: podcasts,
    category: category,
    recommend: recommend,
    setCategory: setCategoryHandler,
    showLoader: setLoaderHandler,
    setPodcasts: setPodcastsHandler,
    setRecommend: setRecommendHandler,
  };

  return (
    <PodcastContext.Provider value={context}>
      {props.children}
    </PodcastContext.Provider>
  );
}

export default PodcastContext;
