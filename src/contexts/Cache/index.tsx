import { createContext, useContext, ReactNode } from "react";
import type { ContextType, cacheBody } from "./cache.type";
import { PostType } from "../../post.types";

const CacheContext = createContext<ContextType | null>(null);

export function useCache() {
  return useContext(CacheContext) as ContextType;
}

export default function CacheProvider({ children }: { children: ReactNode }) {
  const map = new Map<string, cacheBody>();

  function getCache(key: string) {
    const cacheValue = map.get(key);
    if (!cacheValue) return undefined;
    return cacheValue.data;
  }

  function setCache(key: string, value: PostType) {
    map.set(key, {
      data: value,
    });
  }

  function clearCache() {
    map.clear();
  }

  const contextValue = {
    getCache,
    setCache,
    clearCache,
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
}
