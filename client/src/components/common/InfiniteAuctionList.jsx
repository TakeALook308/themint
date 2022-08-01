import React, { useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import { getAuctionList } from '../../utils/api/getAuctionApi';
import useObserver from '../../utils/hooks/useObserver';

function InfiniteAuctionList({ url, queryKey, CardComponent, SkeltonCardComponent }) {
  const [isError, setIsError] = useState(false);
  const bottom = useRef(null);
  let pageNo = 1;
  const getInterestingAuctionList = async ({ pageNo = 1 }) => {
    try {
      const res = await getAuctionList(`${url}&pageno=${pageNo}`);
      return res?.data;
    } catch (_) {
      setIsError(true);
    }
  };

  const { data, error, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    queryKey,
    getInterestingAuctionList,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.hasOwnProperty('hasMore')) {
          const { hasMore } = lastPage;
          if (hasMore) return pageNo++;
          return false;
        }
        return false;
      },
    },
  );

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    hasMore:
      data?.pageParams?.length > 1 ? Boolean(data?.pageParams[data?.pageParams?.length - 1]) : true,
    isError,
  });
  return (
    <div>
      {status === 'loading' && (
        <GridContainer>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeltonCardComponent key={i} />
          ))}
        </GridContainer>
      )}
      {status === 'error' && <p>{error.message}</p>}
      {status === 'success' &&
        data.pages.map((group, index) => (
          <GridContainer key={index}>
            {group?.results.map((_) => (
              <CardComponent />
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
    </div>
  );
}

export default InfiniteAuctionList;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
