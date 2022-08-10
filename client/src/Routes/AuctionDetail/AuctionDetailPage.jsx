import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../style/style';
import { getData } from '../../utils/apis/api';
import { auctionApis } from '../../utils/apis/auctionApis';
import { categories } from '../../utils/constants/constant';
import GradientButton from '../../components/ButtonList/GradientButton';
import { myInformationState } from '../../atoms';
import { useRecoilValue } from 'recoil';

function AuctionDetailPage(props) {
  const userInfo = useRecoilValue(myInformationState);
  const navigate = useNavigate();

  const params = useParams();
  const [auctionInfo, setAuctionInfo] = useState({});
  useEffect(() => {
    getData(auctionApis.AUCTION_DETAIL_API(params.auctionId))
      .then((res) => {
        setAuctionInfo(res.data);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);
  console.log(auctionInfo);
  return (
    <Container>
      <AuctionMainInfo>
        {/* <Crl></Crl> */}
        {/* <div>
          <p>{categories[auctionInfo.categorySeq - 1].name}</p>
          <p>{auctionInfo.title}</p>
          <div>
            <img
              src={`https://s3.ap-northeast-2.amazonaws.com/s3-themint${auctionInfo.profileUrl}`}
              alt="프로필 이미지"
              width="30px"
            />
            <span>{auctionInfo.nickname}</span>
          </div>
        </div>
        <div>
          <span>{auctionInfo.startTime}</span>
        </div> */}
        <GradientButton
          text="경매 참여"
          onClick={() => {
            if (auctionInfo.memberSeq === userInfo.memberSeq)
              navigate(`/standby/${params.auctionId}`);
            else navigate(`/streamings/${params.auctionId}`);
          }}></GradientButton>
      </AuctionMainInfo>
      {/* <AuctionList></AuctionList>
      <AuctionContent></AuctionContent> */}
    </Container>
  );
}

const AuctionMainInfo = styled.div`
  display: flex;
`;

export default AuctionDetailPage;
