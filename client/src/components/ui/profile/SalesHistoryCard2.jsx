import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

function SalesHistoryCard2() {
  const [show, setShow] = useState(false);
  const onActiveToggle = () => {
    console.log(show);
    setShow(!show);
  };
  const saleshistories = {
    seq: 1,
    memberSeq: 1,
    title: '닌텐도 스위치 이것만 있으면 그냥 인생은 끝장난거 입니다.',
    content: `이것이것 저것저것`,
    category: 'IT/전자기기',
    startTime: 'Thu Jul 28 2022 09:00:00 GMT+0900 ',
    date: '2022.07.07',
    products: [
      { seq: 1, productName: `스위치`, startPrice: 1000 },
      { seq: 2, productName: `플스4`, startPrice: 1000 },
    ],
    auctionImages: {
      seq: 1,
      auctionSeq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
  };
  return (
    <div>
      <Container>
        <ImgContainer>
          <img
            src="https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg"
            alt="판매 상품 썸네일"
          />
        </ImgContainer>
        <ArticleContainer>
          <header>
            {saleshistories.category}
            <span>{saleshistories.date}</span>
          </header>
          <h3>{saleshistories.title}</h3>
          <p>{saleshistories.content}</p>
          <DropdownBody onClick={onActiveToggle}>펼치기</DropdownBody>
        </ArticleContainer>
      </Container>
      {show && <DropdownMenu>아 왜 안나옴</DropdownMenu>}
    </div>
  );
}
export default SalesHistoryCard2;

const Container = styled.main`
  width: 100%;
  height: 230px;
  background-color: ${(props) => props.theme.colors.subBlack};
  padding: 30px;
  display: flex;
  align-items: flex-start;
  border-radius: 10px;
`;

const ImgContainer = styled.div`
  width: 30%;
  height: 90%;
  margin-right: 30px;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const ArticleContainer = styled.article`
  width: 100%;
  height: 90%;
  > h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  > p {
    overflow: hidden;
  }
  > header {
    font-size: 14px;
    margin-bottom: 10px;
  }

  > header > span {
    font-size: 16px;
    position: absolute;
    right: 30px;
  }

  > button {
    position: absolute;
    bottom: 10px;
    right: 50%;
  }
`;

const DropdownBody = styled.div`
  position: absolute;
  right: 50%;
  bottom: 5px;
`;

const DropdownMenu = styled.button`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  margin-top: 5px;
  width: 100%;
  height: 100px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.subBlack};
  position: absolute;
  border-radius: 5px;
  z-index: 5;
`;

const DropdownItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2px;
`;
