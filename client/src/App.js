import styled from 'styled-components';
import Router from './Router';
import InputBox from './components/common/InputBox';

function App() {
  return (
    <div>
      <Router />
      <InputBox text="제목" type="text" placeholder="제목" widthValue="500px"></InputBox>
    </div>
  );
}

export default App;
