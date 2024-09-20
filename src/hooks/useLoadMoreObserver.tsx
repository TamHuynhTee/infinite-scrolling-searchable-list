import { useEffect, useRef, useState } from "react";

export const useLoadMoreObserver = ({
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  },
  observerCallbackTimeout = 1000,
  callback,
}: {
  options?: IntersectionObserverInit;
  observerCallbackTimeout?: number;
  callback: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const observerCallbackFn = (entries: Array<IntersectionObserverEntry>) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    if (entry.isIntersecting)
      setTimeout(() => {
        if (!isVisible) callback();
      }, observerCallbackTimeout);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallbackFn, options);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loadMoreRef, options]);

  return {
    isVisible,
    loadMoreRef,
  };
};
