// import { createContext, useState } from "react";

// const PodcastContext = createContext({
//   podcasts: [{ title: "The Joe Rogan Podcast", rating: 4 }],
//   setCategory: function () {},
//   showLoader: false,
// });

// export function PodcastContextProvider(props) {
//   const [category, setCategory] = useState(null);
//   const [loader, setLoader] = useState(null);

//   function setCategoryHandler(category) {
//     setCategory({ page: 1, category: 67 });
//   }

//   function setLoaderHandler(isLoading) {
//     setLoader(isLoading);
//   }

//   const context = {
//     podcasts,
//     setCategory: setCategoryHandler,
//     showLoader: setLoaderHandler,
//   };

//   return (
//     <PodcastContext.Provider value={context}>
//       {props.children}
//     </PodcastContext.Provider>
//   );
// }

// export default PodcastContext;
