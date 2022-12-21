export type Video = {
  id: string;
  imgUrl: string;
  properties: Record<string, unknown>;
};

export interface SectionCardsProps {
  title: string;
  videos: Video[];
  size: "large" | "medium" | "small";
  shouldWrap: boolean;
  shouldScale: boolean;
}
