import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  root?: RefObject<HTMLElement | null>;
};

export const useInfiniteScroll = ({
  hasMore,
  loading,
  onLoadMore,
  root,
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore();
      },
      { root: root?.current ?? null, rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore, root]);

  return sentinelRef;
};
