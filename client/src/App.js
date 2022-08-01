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
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;
