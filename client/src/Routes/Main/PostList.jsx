import AuctionCard from '../../components/CardList/AuctionCard';
import styled from 'styled-components';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import { auctionListApis } from '../../utils/apis/auctionApis';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';

function PostList() {
  return (
    <Wrapper>
      <hr></hr>
      <ListHeader>
        <h2>실시간 임박 경매</h2>
      </ListHeader>
      <InfiniteAuctionList
        getUrl={auctionListApis.AUCTION_LIST('', 9, 'main')}
        queryKey={['imminentAuctionList']}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'실시간 임박 경매가 없습니다.'}
      />
      {/* <InterestingAuctionList /> */}
    </Wrapper>
  );
}

export default PostList;

export const Wrapper = styled.article`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 4rem;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  margin-top: 20px;
  > h3 {
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: bold;
  }
`;
