import React, { useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import { getAuctionList } from '../../utils/apis/auctionApis';
import useObserver from '../../utils/hooks/useObserver';

function InfiniteAuctionList({ getUrl, queryKey, CardComponent, SkeltonCardComponent, text }) {
  const [hasError, setHasError] = useState(false);
  const bottom = useRef(null);
  let pageNo = 0;
  const getTargetAuctionList = async ({ pageNo = 0 }) => {
    try {
      const res = await getAuctionList(getUrl(pageNo));
      console.log(queryKey, 'res', res);
      if (data.length < 1) {
        setHasError(true);
        return;
      }
      return res?.data;
    } catch (_) {
      setHasError(true);
    }
  };

  const { isLoading, data, isError, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(queryKey, getTargetAuctionList, {
      getNextPageParam: (lastPage) => {
        if (lastPage?.hasOwnProperty('hasMore')) {
          const { hasMore } = lastPage;
          if (hasMore) return pageNo++;
          return false;
        }
        return false;
      },
    });

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    hasMore:
      data?.pageParams?.length > 1 ? Boolean(data?.pageParams[data?.pageParams?.length - 1]) : true,
    hasError,
  });
  console.log(data, queryKey);
  return (
    <div>
      {/* {(hasError || !data?.pages?.length) && <p>{text}</p>} */}
      {isLoading && (
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
            {group?.resultList?.map((auction, idx) => (
              <CardComponent auction={auction} key={idx} />
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
