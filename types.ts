export type MetadataProps = {
  issuer?: string | null;
  email?: string | null;
  publicAddress?: string | null;
};

export type StatProps = {
  userId: string;
  videoId: string;
  favourited: number;
  watched: boolean;
};

export type Video = {
  videoId: string;
  imgUrl: string;
};
