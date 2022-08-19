import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

function Loading(props) {
  const likecontainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: likecontainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../assets/animation/loading.json'),
    });
  }, []);
  return (
    <Wrapper>
      <NoMore ref={likecontainer}></NoMore>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NoMore = styled.div`
  width: 20%;
  z-index: 1000;
`;
