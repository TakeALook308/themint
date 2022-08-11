import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AuctionCard from '../../components/CardList/AuctionCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import CateCardList from '../../components/ui/category/CateCardList';
import Dropdown from '../../components/ui/category/SelectBox';
import { Container } from '../../style/common';
import { auctionListApis } from '../../utils/apis/auctionApis';

function CategoryPage({ categoryName }) {
  const [categorySeq, setCategorySeq] = useState('0');
  const [sortKey, setSortKey] = useState('startTime');

  const { categoryId } = useParams();
  useEffect(() => {
    setCategorySeq(categoryId);
  }, [categoryId]);

  const getCategorySeq = (value) => {
    setCategorySeq(value);
  };

  const getSortKey = (value) => {
    setSortKey(value);
  };
  return (
    <Container>
      <CateListContainer>
        <CateCardList categoryName={categoryName} getCategorySeq={getCategorySeq} />
      </CateListContainer>
      <Dropdown getSortKey={getSortKey} />
      <InfiniteAuctionList
        getUrl={auctionListApis.CATEGORY_AUCTION_LIST(categorySeq, 12, sortKey)}
        queryKey={[categorySeq + sortKey]}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'경매 목록이 없습니다.'}
      />
    </Container>
  );
}
export default CategoryPage;

const CateListContainer = styled.header`
  margin-bottom: 1.25rem;
`;
