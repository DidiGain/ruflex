import { Magic } from "magic-sdk";

const createMagic = (apiKey: string) => {
  if (typeof window !== "undefined") {
    return new Magic(apiKey);
  }
};

const key = process.env.NEXT_PUBLIC_MAGIC_KEY as string;
export const magic = createMagic(key);
