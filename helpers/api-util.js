import axios from "axios";

export async function getPodcasts(categoryId, page) {
  try {
    const response = await axios.get(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${categoryId}&page=${page}&region=us&safe_mode=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
        },
        credentials: "same-origin",
      }
    );
    const data = await response.data;
    return data.podcasts;
  } catch (error) {
    console.log(`There has been an error,  ${error}`);
  }
}
