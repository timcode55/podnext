import { PodcastContextProvider } from "../store/podcastContext";
import "../styles/globals.css";
// import { PodcastContext } from "../context";

function MyApp({ Component, pageProps }) {
  // <PodcastContextProvider>
  //   <Component {...pageProps} />;
  // </PodcastContextProvider>;
  return (
    <PodcastContextProvider>
      <Component {...pageProps} />
    </PodcastContextProvider>
  );
}

export default MyApp;
