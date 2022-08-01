import React from 'react';
import styled from 'styled-components';
import Router from './Router';

function App(props) {
  return (
    <Container>
      <Router></Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;
