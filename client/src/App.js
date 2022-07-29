import React from 'react';
import styled from 'styled-components';
import Router from './Router';
import Footer from './components/ui/Footer';

function App(props) {
  return (
    <Container>
      <Router></Router>
      <Footer />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 1440px;
  margin-left: auto;
  margin-right: auto;
`;
