import { instance } from './api';

export const auctionApis = {
  AUCTION_CREATE_API: `/api/auction`,
  AUCTION_DETAIL_API: (auctionId) => `/api/auction/${auctionId}`,
  AUCTION_DATE_API: `/api/auction/date`,
};

export const auctionListApis = {
  LIVE_AUCTION_LIST: '/api/auction/live',
  AUCTION_LIST: (word, size, sort) => {
    return (page) => `/api/auction/search?word=${word}&page=${page}&size=${size}&sort=${sort}`;
  },
  MAIN_CATEGORY_AUCTION_LIST: (size) => {
    return (page) => `/api/auction/main?page=${page}&size=${size}`;
  },
  CATEGORY_AUCTION_LIST: (category, size, sort) => {
    return (page) =>
      `/api/auction/category?category-seq=${category}&page=${page}&size=${size}&sort=${sort}`;
  },
  PRODUCT_LIST: (word, size, sort) => {
    return (page) => `/api/product?word=${word}&page=${page}&size=${size}&sort=${sort}`;
  },
};

export const getAuctionList = async (url) => {
  const response = await instance.get(url);
  return response;
};
