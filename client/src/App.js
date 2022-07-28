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
<<<<<<< HEAD
  background-color: ${(props) => props.theme.colors.mainBlack};
=======
>>>>>>> 8c3e246949c453ab8f5abae92bd63d0b6daead3d
  margin-left: auto;
  margin-right: auto;
`;
