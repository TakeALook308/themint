// TODO: 서버 api 완성 시 삭제 예정 컴포넌트
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { instance } from '../utils/api/api';
import useObserver from '../utils/hooks/useObserver';
import AuctionCard from './CardList/AuctionCard';
import SkeletonAuctionCard from './CardList/SkeletonAuctionCard';

function InterestingAuctionList() {
  const bottom = useRef(null);
  const getInterestingAuctionList = async ({ pageParam = OFFSET }) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${OFFSET}&offset=${pageParam}`,
    );
    console.log(res);
    return res?.data;
  };

  const OFFSET = 9;
  const { data, error, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    'auctionList',
    getInterestingAuctionList,
    {
      getNextPageParam: (lastPage) => {
        const { next } = lastPage;
        if (next) return Number(new URL(next).searchParams.get('offset'));
        return false;
      },
    },
  );
  console.log(data);

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    hasMore:
      data?.pageParams?.length > 1 ? Boolean(data?.pageParams[data?.pageParams?.length - 1]) : true,
  });
  return (
    <div>
      {status === 'loading' && <p>불러오는 중</p>}
      {status === 'error' && <p>{error.message}</p>}
      {status === 'success' &&
        data.pages.map((group, index) => (
          <div
            key={index}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '1rem' }}>
            {group.results.map((pokemon) => (
              // <p key={pokemon.name}>{pokemon.name}</p>
              <AuctionCard />
            ))}
          </div>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '1rem' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonAuctionCard key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterestingAuctionList;
