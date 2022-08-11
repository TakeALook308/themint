import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/ui/common/NavigationBar';
import Footer from './components/ui/common/Footer';
import ProtectedRoute from './components/routes/ProtectedRoute';
import {
  AccountsEdit,
  AccountsPassword,
  AccountsPhoneNumber,
  AccountsWithdrawl,
  AuctionCreate,
  AuctionDetail,
  Category,
  Login,
  Main,
  NotFound,
  PasswordReset,
  PurchaseHistoryDetail,
  Profile,
  Register,
  StandBy,
  Streaming,
  Talks,
} from './Routes/index';
import { useRecoilValue } from 'recoil';
import { loggedinState } from './atoms';

function Router() {
  const loggedin = useRecoilValue(loggedinState);
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="" element={<Main />} />
        <Route element={<ProtectedRoute loggedin={!loggedin} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="help/password" element={<PasswordReset />} />
        </Route>
        <Route element={<ProtectedRoute loggedin={loggedin} />}>
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="accounts/edit" element={<AccountsEdit />} />
          <Route path="accounts/password" element={<AccountsPassword />} />
          <Route path="accounts/phone-number" element={<AccountsPhoneNumber />} />
          <Route path="accounts/withdrawl" element={<AccountsWithdrawl />} />
          <Route path="talks" element={<Talks />} />
          <Route path="puchase-history/:purchaseId" element={<PurchaseHistoryDetail />} />
          <Route path="standby/:auctionId" element={<StandBy />} />
          <Route path="auctions/new" element={<AuctionCreate />} />
          <Route path="streamings/:auctionId" element={<Streaming />} />
        </Route>
        <Route path="main" element={<Main />} />
        <Route path="categories/:categoryId" element={<Category />} />
        <Route path="auctions/:auctionId" element={<AuctionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
