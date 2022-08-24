import React, { useState, useEffect, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import Router from './Router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { useSetRecoilState } from 'recoil';
import { myInformationState, notificationState } from './atoms';
import { getCookie } from './utils/functions/cookies';
import { fetchData } from './utils/apis/api';
import { userApis } from './utils/apis/userApis';

function App() {
  const setMyInformation = useSetRecoilState(myInformationState);
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(false);
  const token = getCookie('accessToken');
  const setNotificationEnabled = useSetRecoilState(notificationState);

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const response = await fetchData.get(userApis.MY_BASIC_INFORMATION);
          setMyInformation(response.data);
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(true);
    })();
  }, []);

  return (
    <HelmetProvider>
      <Suspense fullback={<h1>Loading...</h1>}>
        <Container
          onClick={(e) => {
            setNotificationEnabled(false);
          }}>
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
          {loading && (
            <QueryClientProvider client={queryClient}>
              <Router />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          )}
        </Container>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;

const Container = styled.div`
  scroll-behavior: smooth;
  margin-left: auto;
  margin-right: auto;
`;
