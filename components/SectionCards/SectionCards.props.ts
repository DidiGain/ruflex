type Video = {
  id: number;
  imgUrl: string;
};

export interface SectionCardsProps {
  title: string;
  videos: Video[];
  size: string;
  shouldWrap: boolean;
  shouldScale: boolean;
}
