import React, { useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import useObserver from '../../utils/hooks/useObserver';
import Loading from './Loading';

function InfiniteAuctionList({
  getUrl,
  queryKey,
  CardComponent,
  SkeltonCardComponent,
  text,
  func,
}) {
  const [hasError, setHasError] = useState(false);
  const bottom = useRef(null);

  const getTargetAuctionList = async ({ pageParam = 0 }) => {
    if (pageParam === false) {
      return;
    }
    try {
      const res = await fetchData.get(getUrl(pageParam));
      return { data: res?.data, page: pageParam };
    } catch (_) {
      setHasError(true);
    }
  };
  const { isLoading, data, error, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    queryKey,
    getTargetAuctionList,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.hasOwnProperty('hasMore')) {
          const {
            data: { hasMore },
          } = lastPage;
          if (hasMore) return lastPage.page + 1;
          return false;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: 60 * 1000,
    },
  );

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    hasMore:
      data?.pageParams?.length > 1 ? Boolean(data?.pageParams[data?.pageParams?.length - 1]) : true,
    hasError,
  });
  return (
    <Container>
      {data?.pages[0]?.data?.resultList.length < 1 && <p>{text}</p>}
      {isLoading && <Loading />}
      {status === 'error' && <p>{error.message}</p>}
      {status === 'success' &&
        data.pages.map((group, index) => (
          <GridContainer key={index}>
            {group?.data?.resultList?.map((auction, idx) => (
              <CardComponent auction={auction} key={idx} func={func} />
            ))}
          </GridContainer>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeltonCardComponent key={i} />
          ))}
        </GridContainer>
      )}
    </Container>
  );
}

export default InfiniteAuctionList;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
