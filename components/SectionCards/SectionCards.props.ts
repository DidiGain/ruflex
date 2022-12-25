export interface Video {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  publishedAt: string;
  channelTitle: string;
  statistics: { viewCount: number };
}

export interface SectionCardsProps {
  title: string;
  videos: Video[];
  size: "large" | "medium" | "small";
  shouldWrap: boolean;
  shouldScale: boolean;
}
