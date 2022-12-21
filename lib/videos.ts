import videoTestData from "../data/videos.json";

export const fetchVideos = async () => {
  const YT_API_KEY = process.env.YT_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/search?part=snippet&maxResults=25&q=disney%20trailer&key=${YT_API_KEY}`
  );

  const data = await response.json();

  return data?.items.map((item: Record<string, any>) => {
    return {
      id: item?.id?.videoId,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
    };
  });
};
