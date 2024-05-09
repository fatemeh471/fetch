import type { PostType } from "../../post.types";
export type ContextType = {
  getCache: (key: string) => unknown;
  setCache: (key: string, value: unknown, ttl?: number) => void;
  clearCache: () => void;
};

export type cacheBody = {
  data: PostType;
};
