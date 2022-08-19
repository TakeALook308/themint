import React from 'react';
import { useRecoilValue } from 'recoil';
import { myInformationState } from '../../atoms';
import AuctionCard from '../../components/CardList/AuctionCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import { auctionListApis } from '../../utils/apis/auctionApis';
import Header from './Header';
import { ListHeader, Wrapper } from './PostList';

function InterestingList() {
  const myInformation = useRecoilValue(myInformationState);
  return (
    <Wrapper>
      <hr></hr>
      {myInformation?.nickname ? (
        <Header title={`${myInformation.nickname}님을 위한 추천 경매 목록`} />
      ) : (
        <Header title={'이런 경매는 어때요?'} />
      )}
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
