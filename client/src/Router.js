import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Routes/Login';
import Register from './Routes/Register';
import Main from './Routes/Main';
import Category from './Routes/Category';
import Profile from './Routes/Profile';
import AccountsEdit from './Routes/AccountsEdit';
import AccountsPhoneNumber from './Routes/AccountsPhoneNumber';
import AccountsPassword from './Routes/AccountsPassword';
import AccountsWithdrawl from './Routes/AccountsWithdrawl';
import Streaming from './Routes/Streaming';
import AuctionDetail from './Routes/AuctionDetail';
import PurchaseHistoryDetail from './Routes/PurchaseHistoryDetail';
import Talks from './Routes/Talks';
import NavigationBar from './components/ui/common/NavigationBar';
import Footer from './components/ui/common/Footer';
import FindPassword from './Routes/FindPassword';
import AuctionCreate from './Routes/AuctionCreate';
function Router() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/help/password" element={<FindPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/categories/:categoryName" element={<Category />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/accounts/edit" element={<AccountsEdit />} />
        <Route path="/accounts/password" element={<AccountsPassword />} />
        <Route path="/accounts/phone-number" element={<AccountsPhoneNumber />} />
        <Route path="/accounts/withdrawl" element={<AccountsWithdrawl />} />
        <Route path="/streamings/:roomNumber" element={<Streaming />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/auctions/:auctionsId" element={<AuctionDetail />} />
        <Route path="/auctions/new" element={<AuctionCreate />} />
        <Route path="/puchase-history/:purchaseId" element={<PurchaseHistoryDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
