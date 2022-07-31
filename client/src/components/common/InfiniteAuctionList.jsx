import styled from '@emotion/styled/types/base';
import React, { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getAuctionList } from '../../utils/api/getAuctionApi';
import useObserver from '../utils/hooks/useObserver';
import AuctionCard from './common/AuctionCard';
import SkeletonAuctionCard from './common/SkeletonAuctionCard';

function InfiniteAuctionList({ url, queryKey }) {
  const bottom = useRef(null);
  let pageNo = 1;
  const getInterestingAuctionList = async ({ pageNo = 1 }) => {
    const res = await getAuctionList(`${url}&pageno=${pageNo}`);
    return res?.data;
  };

  const { data, error, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    queryKey,
    getInterestingAuctionList,
    {
      getNextPageParam: (lastPage) => {
        const { hasMore } = lastPage;
        if (hasMore) return pageNo++;
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
  });
  return (
    <div>
      {status === 'loading' && (
        <GridContainer>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonAuctionCard key={i} />
          ))}
        </GridContainer>
      )}
      {status === 'error' && <p>{error.message}</p>}
      {status === 'success' &&
        data.pages.map((group, index) => (
          <GridContainer key={index}>
            {group.results.map((_) => (
              <AuctionCard />
            ))}
          </GridContainer>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonAuctionCard key={i} />
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
