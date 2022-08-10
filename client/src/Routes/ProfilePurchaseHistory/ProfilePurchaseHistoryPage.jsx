import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IsPurchasingCardList from '../../components/ui/profile/Purchase/IsPurchaingCardList';
import { myInformationState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { instance } from '../../utils/apis/api';

function ProfilePurchaseHistoryPage({ params }) {
  const [auctionItems, setAuctionItems] = useState([]);
  // 사용자랑 프로필 일치여부 확인
  const myInformation = useRecoilValue(myInformationState);
  const strMemberSeq = `${myInformation.memberSeq}`;
  // 구매내역 API 요청
  useEffect(() => {
    const getSalesAuction = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesAuction(`/api/history/sales/${params}?page${1}=&size=${9}`);
    res.then((auctionitem) => {
      console.log(auctionitem.data);
      setAuctionItems(auctionitem.data);
    });
  }, [params]);
  return (
    <Container>
      {params === strMemberSeq && (
        <IsPurchasingCardList params={params} auctionItems={auctionItems} />
      )}
    </Container>
  );
}

export default ProfilePurchaseHistoryPage;

const Container = styled.div`
  width: 100%;
`;
