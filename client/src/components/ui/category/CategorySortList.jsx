import React, { useState } from 'react';

function CategoryList(props) {


  function sortByRecent(auctions.posttime) {
    const sortedArr = arr.slice();
    for (let i = 0; i < sortedArr.length; i++) {
      let swap;
      for (let j = 0; j < sortedArr.length - 1 - i; j++) {
        if (sortedArr[j].itemPrice > sortedArr[j + 1].itemPrice) {
          swap = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = swap;
        }
      }
      if (!swap) {
        break;
      }
    }
    return sortedArr;
  }

  function sortByLowPrice(auctions.products.startPrice) {
    const sortedArr = arr.slice();
    for (let i = 0; i < sortedArr.length; i++) {
      let swap;
      for (let j = 0; j < sortedArr.length - 1 - i; j++) {
        if (sortedArr[j].itemPrice > sortedArr[j + 1].itemPrice) {
          swap = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = swap;
        }
      }
      if (!swap) {
        break;
      }
    }
    return sortedArr;
  }

  function sortByLike(auctions.like) {
    const sortedArr = arr.slice();
    for (let i = 0; i < sortedArr.length; i++) {
      let swap;
      for (let j = 0; j < sortedArr.length - 1 - i; j++) {
        if (sortedArr[j].itemPrice > sortedArr[j + 1].itemPrice) {
          swap = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = swap;
        }
      }
      if (!swap) {
        break;
      }
    }
    return sortedArr;
  }

  function sortByLike(auctions.like) {
    const sortedArr = arr.slice();
    for (let i = 0; i < sortedArr.length; i++) {
      let swap;
      for (let j = 0; j < sortedArr.length - 1 - i; j++) {
        if (sortedArr[j].itemPrice > sortedArr[j + 1].itemPrice) {
          swap = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = swap;
        }
      }
      if (!swap) {
        break;
      }
    }
    return sortedArr;
  }

  function sortByTrust(auctions.trust) {
    const sortedArr = arr.slice();
    for (let i = 0; i < sortedArr.length; i++) {
      let swap;
      for (let j = 0; j < sortedArr.length - 1 - i; j++) {
        if (sortedArr[j].itemPrice > sortedArr[j + 1].itemPrice) {
          swap = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = swap;
        }
      }
      if (!swap) {
        break;
      }
    }
    return sortedArr;
  }

  const sortedByRecent = sortByRecent(auctions);
  const sortedByLowPrice = sortByLowPrice(auctions);
  const sortedByLike = sortByLike(auctions);
  const sortedByTrust = sortByTrust(auctions);

  const [priceFilter, setPriceFilter] = useState('sortByRecent');
  function handleChange(event) {
    setPriceFilter(event.target.value);
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option value="sortByRecent">최신순</option>
        <option value="sortByPrice">가격순</option>
        <option value="sortByLike">인기순</option>
        <option value="sortByTrust">신뢰도순</option>
      </select>
      <div>
        {sortFilter === 'sortByRecent'
          ? sortedByRecent.map((itmes) => <Item items={items} key={items.id} />)
          : null}
        {priceFilter === 'sortByPrice'
          ? sortedByLowPrice.map((items) => <Item items={items} key={items.id} />)
          : null}
        {priceFilter === 'sortByLike'
          ? sortedByLike.map((items) => <Item items={items} key={items.id} />)
          : null}
        {priceFilter === 'sortByTrust'
          ? sortedByTrust.map((items) => <Item items={items} key={items.id} />)
          : null}
      </div>
    </div>
  );
}
export default CategoryList;
