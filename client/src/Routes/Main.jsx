import React from 'react';
import Banner from '../components/ui/Banner';
import StreamList from '../components/list/main/StreamListSwipe';
import PostList from '../components/list/main/PostList';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { instance } from '../utils/api/api';

function Main(props) {
  const fetchPage = async ({ pageParam = 0 }) => {
    const { data } = await instance.get({ startIndex: pageParam });
    return {
      result: data,
      nextPage: pageParam + 1,
      isLast: data.isLast,
    };
  };

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery('[]', ({ pageParam = 1 }) => {
    console.log(pageParam);
  });
  return (
    <Container>
      <BannerContainer>
        <Banner />
      </BannerContainer>
      <StreamList />
      <PostList />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
`;

const BannerContainer = styled.div`
  margin-bottom: 1.25rem;
  margin-top: 60px;
`;
