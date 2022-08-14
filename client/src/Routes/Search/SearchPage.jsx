import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { instance } from '../../utils/apis/api';
import { Container } from '../../style/style';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import AuctionCard from '../../components/CardList/AuctionCard';
import ProductCard from './ProductCard';
import ProfileSearchCard from './ProfileSearchCard';

function SearchPage(props) {
  const params = new URLSearchParams(window.location.search);
  const [sortKey, setSortKey] = useState('startTime');
  const [pageTitle, setPageTitle] = useState('경매 검색');
  const [searchParams] = useSearchParams();
  const key = searchParams.get('keyword');
  const type = searchParams.get('type');
  const navigate = useNavigate();
  const auctionSortKeys = [
    { value: 'startTime', name: '경매임박순' },
    { value: 'seq', name: '최신등록순' },
    { value: 'interest', name: '인기순' },
    { value: 'score', name: '판매자신뢰도순' },
  ];
  const productSortKeys = [
    { value: 'startTime', name: '경매임박순' },
    { value: 'seq', name: '최신등록순' },
    { value: 'interest', name: '인기순' },
    { value: 'startPrice', name: '낮은가격순' },
    { value: 'score', name: '판매자신뢰도순' },
  ];

  const onChange = ({ target: { value } }) => {
    setSortKey(value);
  };

  const getSearchUrl = (word, size) => {
    return (page) => `/api/${type}/search?word=${word}&page=${page}&size=${size}&sort=${sortKey}`;
  };

  const getSearchProfileUrl = (word, size) => {
    return (page) => `/api/${type}/search?word=${word}&page=${page}&size=${size}`;
  };

  const onClickAuction = () => {
    setPageTitle('경매 검색');
    navigate({
      pathname: '/search',
      search: `?type=auction&keyword=${key}`,
    });
  };

  const onClickProduct = () => {
    setPageTitle('상품 검색');
    navigate({
      pathname: '/search',
      search: `?type=product&keyword=${key}`,
    });
  };

  const onClickProfile = () => {
    setPageTitle('프로필 검색');
    navigate({
      pathname: '/search',
      search: `?type=member&keyword=${key}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle} | 더민트</title>
      </Helmet>

      <Container>
        <HeaderContainer>
          <SearchTabButton
            className={(props) => {
              return `${props.isActive ? 'isActive ' : ''}iconContainer`;
            }}
            end
            onClick={onClickAuction}>
            경매
          </SearchTabButton>
          <SearchTabButton onClick={onClickProduct}>상품</SearchTabButton>
          <SearchTabButton onClick={onClickProfile}>프로필</SearchTabButton>
        </HeaderContainer>

        {type === 'auction' ? (
          <>
            <Select value={sortKey} onChange={onChange}>
              {auctionSortKeys.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
            <InfiniteAuctionList
              getUrl={getSearchUrl(key, 9)}
              queryKey={[type + key + sortKey]}
              CardComponent={AuctionCard}
              SkeltonCardComponent={SkeletonAuctionCard}
              text={'경매 검색 결과가 없습니다.'}
            />
          </>
        ) : null}
        {type === 'product' ? (
          <>
            <Select value={sortKey} onChange={onChange}>
              {productSortKeys.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
            <InfiniteAuctionList
              getUrl={getSearchUrl(key, 9)}
              queryKey={[type + key + sortKey]}
              CardComponent={ProductCard}
              SkeltonCardComponent={SkeletonAuctionCard}
              text={'상품 검색 결과가 없습니다.'}
            />
          </>
        ) : null}
        {type === 'member' ? (
          <InfiniteAuctionList
            getUrl={getSearchProfileUrl(key, 9)}
            queryKey={[type + key]}
            CardComponent={ProfileSearchCard}
            SkeltonCardComponent={SkeletonAuctionCard}
            text={'프로필 검색 결과가 없습니다.'}
          />
        ) : null}
      </Container>
    </>
  );
}

export default SearchPage;

const HeaderContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const SearchTabButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  width: 33.3%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.mainBlack};
  border-bottom: 2px solid ${(props) => props.theme.colors.subMint};

  outline: invert;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.mainMint};
  }
  &.active {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.mainBlack};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: bold;
    border: 3px solid ${(props) => props.theme.colors.subMint};
    border-bottom: none;
  }
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 13%;
  height: 40px;
  color: ${(props) => props.theme.colors.white};
  padding: 10px;
  margin: 0;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  background: url('https://user-images.githubusercontent.com/57048162/183007422-e8474fa0-acc1-441e-b7e1-c0701b82b766.png')
    no-repeat;
  background-position: 99%;
  background-size: 15px 12px;
  background-color: ${(props) => props.theme.colors.pointBlack};

  & option {
    display: block;
    padding: 10px;
  }
`;
