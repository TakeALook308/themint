import styled from 'styled-components';
import Router from './Router';

function App() {
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 1440px;
  background-color: red;
  margin-left: auto;
  margin-right: auto;
`;
