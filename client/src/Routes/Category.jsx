import React from 'react';
import styled from 'styled-components';
import CateCardList from '../components/ui/category/CateCardList';
import Dropdown from '../components/ui/category/SelectBox';
import InterestingAuctionList from '../components/InterestingAuctionList';
import InfiniteAuctionList from '../components/common/InfiniteAuctionList';
import { auctionListApis } from '../utils/api/getAuctionApi';
import AuctionCard from '../components/common/AuctionCard';
import SkeletonAuctionCard from '../components/common/SkeletonAuctionCard';

function Category({ categoryName }) {
  return (
    <Container>
      <CateListContainer>
        <CateCardList categoryName={categoryName} />
      </CateListContainer>
      <DropdownContainer>
        <Dropdown />
      </DropdownContainer>
      <InfiniteAuctionList
        url={auctionListApis.SEARCH_AUCTION_LIST_API()}
        queryKey={'interestingAuctionList'}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
      />
    </Container>
  );
}

export default Category;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
`;

const CateListContainer = styled.header`
  margin-bottom: 1.25rem;
  margin-top: 70px;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;
