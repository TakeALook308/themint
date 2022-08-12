import React from 'react';
import { useRecoilValue } from 'recoil';
import { myInformationState } from '../../atoms';
import AuctionCard from '../../components/CardList/AuctionCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import { auctionListApis } from '../../utils/apis/auctionApis';
import { ListHeader, Wrapper } from './PostList';

function InterestingList() {
  const myInformation = useRecoilValue(myInformationState);
  return (
    <Wrapper>
      <hr></hr>
      <ListHeader>
        {myInformation?.nickname ? (
          <h2>{myInformation.nickname}님의 관심 카테고리 경매</h2>
        ) : (
          <h3>추천 경매 목록</h3>
        )}
      </ListHeader>
      <InfiniteAuctionList
        getUrl={auctionListApis.MAIN_CATEGORY_AUCTION_LIST(9)}
        queryKey={['interestingAuctionList']}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'경매 목록이 없습니다.'}
        type={'interest'}
      />
    </Wrapper>
  );
}

export default InterestingList;
