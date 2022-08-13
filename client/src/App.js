import React, { useState, useEffect, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import Router from './Router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Session from './utils/functions/storage';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { useRecoilState } from 'recoil';
import { myInformationState } from './atoms';
import { getCookie } from './utils/functions/cookies';
import { fetchData } from './utils/apis/api';
import { userApis } from './utils/apis/userApis';

export const session = new Session();
function App(props) {
  const [myInformation, setMyInformation] = useRecoilState(myInformationState);
  const [queryClient] = useState(() => new QueryClient());
  const token = getCookie('accessToken');
  useEffect(() => {
    (async () => {
      if (token) {
        const response = await fetchData.get(userApis.MY_BASIC_INFORMATION);
        setMyInformation(response.data);
      }
    })();
  }, []);
  console.log(myInformation);

  return (
    <HelmetProvider>
      <Container>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Container>
    </HelmetProvider>
  );
}

export default App;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;
