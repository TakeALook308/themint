import React, { useEffect } from 'react';
import { useInview } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { instance } from '../utils/api/api';

function useInfiniteQueryWithScroll({ currentSearchType, queryString }) {
  const getEventListWithPageInfo = async ({ pageParam = 0 }) => {
    const { data } = await instance.get({
      ...queryString,
      eventType: currentSearchType,
      searchType: currentSearchType,
      startIndex: pageParam,
    });

    const nextPage = data.length ? pageParam + 1 : undefined;

    return {
      result: data,
      nextPage,
      isLast: !nextPage,
    };
  };

  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery([
    `eventListData-${currentSearchType}`,
    getEventListWithPageInfo,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  ]);
  const ObservationComponent = () => {
    const [ref, inView] = useInview();

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.page[pageLastIdx].isLast;

      if (!isLast && inView) fetchNextPage();
    }, [inView]);
    return <div ref={ref} />;
  };
  return {
    data: data?.pages,
    error,
    isFetching,
    ObservationComponent,
  };
}

export default useInfiniteQueryWithScroll;
