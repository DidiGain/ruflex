type Video = {
  id: number;
  imgUrl: string;
};

export interface SectionCardsProps {
  title: string;
  videos: Video[];
  size: "large" | "medium" | "small";
  shouldWrap: boolean;
  shouldScale: boolean;
}
