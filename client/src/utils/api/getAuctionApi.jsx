import { instance } from './api';

export const auctionListApis = {
  SEARCH_AUCTION_LIST_API: (word, key, category) =>
    `/api/auction?word=${word}&key=${key}&category=${category}`,
};

export const getAuctionList = async (url) => {
  const response = await instance.get(url);
  return response;
};
