export interface CardProps {
  id: number;
  imgUrl: string;
  size: "large" | "medium" | "small";
  shouldScale: boolean;
}
