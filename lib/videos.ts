import videoTestData from "../data/videos.json";
import { Video } from "../types";
import { getMyList, getWatchedVideos } from "./db/hasura";

const YT_API_KEY = process.env.YT_API_KEY;
const BASE_URL = "youtube.googleapis.com/youtube/v3";

const fetchVideos = async (url: string) => {
  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YT_API_KEY}`
  );

  return await response.json();
};

export const fetchCommonVideos = async (url: string) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data?.items?.map((item: Record<string, any>) => {
      const id = item.id.videoId || item.id;

      return {
        id,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics ?? "not provided",
      };
    });
  } catch (err) {
    console.error("smth went wrong with the video library", err);
  }
};

export const fetchVideosBySearchQuery = (searchQuery: string) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return fetchCommonVideos(URL);
};

export const fetchPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return fetchCommonVideos(URL);
};

export const fetchVideoById = (videoId: string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return fetchCommonVideos(URL);
};

export const fetchWatchedVideos = async (token: string, userId: string) => {
  const videos = await getWatchedVideos(token, userId);
  return videos?.map(
    (video: Video) =>
      ({
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      } || [])
  );
};

export const fetchMyList = async (token: string, userId: string) => {
  const videos = await getMyList(token, userId);
  return videos?.map(
    (video: Video) =>
      ({
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      } || [])
  );
};
