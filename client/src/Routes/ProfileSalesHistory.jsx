// import React from 'react';
// import styled from 'styled-components';
// import { useState } from 'react';
// import getAuctionList from '../utils/api/getAuctionApi';

// function ProfileSalesHistory(props) {
//   const [isSold, setIsSold] = useState('selling');

//   const onSelling = async () => {
//     setIsSold('selling');
//     const res = await getAuctionList(`/selling`);
//     return res?.data;
//   };
//   const onSold = async () => {
//     setIsSold('Sold');
//     const res = await getAuctionList(`/sold`);
//   };
//   return (
//     <ButtonNav>
//       <button onClick={onSelling}>판매중</button>
//       <button onClick={onSold}>판매완료</button>
//     </ButtonNav>
//   );
// }

// export default ProfileSalesHistory;

// const ButtonNav = styled.nav`
//   width: 100%;
//   height: 50px;
// `;
