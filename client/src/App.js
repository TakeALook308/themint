import styled from 'styled-components';
import Router from './Router';

function App(props) {
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 1440px;
  background-color: ${(props) => props.theme.colors.mainBlack};
  margin-left: auto;
  margin-right: auto;
`;
