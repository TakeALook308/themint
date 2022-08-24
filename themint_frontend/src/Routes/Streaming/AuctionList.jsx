import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
// import { auctionApis } from '../../utils/apis/auctionApis';

function AuctionList({ products, auctionId }) {
  // console.log('내부에서', products);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // if (auctionApis)
    setInterval(() => {
      fetchData.get(`/api/auction/${auctionId}`).then((res) => {
        setProductList(res.data.productList);
      });
    }, 1000);
  }, []);
  if (productList.length !== 0)
    return (
      <Article>
        <p>경매리스트</p>
        <List>
          {productList?.map((item, i) => (
            <li key={i}>
              <p>{item.productName}</p>
              <span>{item.startPrice.toLocaleString()}원~</span>
              {item.status === 1 ? <Finish>낙찰 성공!</Finish> : null}
              {item.status === 4 ? <Finish>낙찰 실패...</Finish> : null}
            </li>
          ))}
        </List>
      </Article>
    );
  else
    return (
      <Article>
        <p>경매리스트</p>
        <List>
          {products?.map((item, i) => (
            <li key={i}>
              <p>{item.productName}</p>
              <span>{item.startPrice.toLocaleString()}원~</span>
              {item.status === 1 ? <Finish>끝났습니다</Finish> : null}
              {item.status === 4 ? <Finish>유찰입니다</Finish> : null}
            </li>
          ))}
        </List>
      </Article>
    );
}

const Article = styled.article`
  height: 130px;
  width: 100%;
  /* background-color: purple; */
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
  padding: 10px;
  & > p {
    font-size: 20px;
    font-weight: 500;
    padding: 5px 0;
  }
`;

const List = styled.ul`
  display: flex;
  width: 100%;

  padding: 10px;
  gap: 10px;
  align-items: center;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;
    background-color: ${(props) => props.theme.colors.pointBlack};
    height: 70px;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    p {
      font-size: 18px;
      font-weight: 600;
      padding-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const Finish = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(13, 12, 15, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export default AuctionList;
