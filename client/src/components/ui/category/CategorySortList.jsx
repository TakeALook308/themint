// import React, { useState } from 'react';

// function CategoryList(props) {
//   function getPrice(priceStr) {
//     return Number(priceStr.slice(-priceStr.length, -4) + priceStr.slice(-3));
//   }
//   return (
//     <div>
//       <select onChange={handleChange}>
//         <option value="sortByRecent">최신순</option>
//         <option value="sortByPrice">가격순</option>
//         <option value="sortByLike">인기순</option>
//         <option value="sortByTrust">신뢰도순</option>
//       </select>
//       <div>
//         {sortFilter === 'sortByRecent'
//           ? sortedByRecent.map((itmes) => <Item items={items} key={items.id} />)
//           : null}
//         {priceFilter === 'sortByPrice'
//           ? sortedByLowPrice.map((items) => <Item items={items} key={items.id} />)
//           : null}
//         {priceFilter === 'sortByLike'
//           ? sortedByLike.map((items) => <Item items={items} key={items.id} />)
//           : null}
//         {priceFilter === 'sortByTrust'
//           ? sortedByTrust.map((items) => <Item items={items} key={items.id} />)
//           : null}
//       </div>
//     </div>
//   );
// }
// export default CategoryList;
