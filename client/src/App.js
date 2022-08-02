import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import Router from './Router';

function App(props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Container>
        <QueryClientProvider client={queryClient}>
          <Router></Router>
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
<<<<<<< HEAD
  max-width: 1024px;
=======
  max-width: 1440px;
>>>>>>> 560562e3f93109d03b754be0863b66796ce04631
  margin-left: auto;
  margin-right: auto;
`;
