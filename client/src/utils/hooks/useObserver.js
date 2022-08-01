import { useEffect } from 'react';

function useObserver({
  target,
  onIntersect,
  hasMore,
  isError,
  root = null,
  rootMargin = '-100px',
  threshold = 0,
}) {
  useEffect(() => {
    let observer;
    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }
    if (!hasMore || isError) observer && observer.disconnect();
    return () => observer && observer.disconnect();
  }, [hasMore, target, rootMargin, threshold]);
}

export default useObserver;
