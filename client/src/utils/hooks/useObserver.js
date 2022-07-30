import React, { useEffect } from 'react';

function useObserver({
  target,
  onIntersect,
  hasMore,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
}) {
  useEffect(() => {
    let observer;
    console.log(hasMore);

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }

    if (!hasMore) observer && observer.disconnect();
    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
}

export default useObserver;
