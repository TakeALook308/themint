import React from 'react';
import styled from 'styled-components';

function Movie({ medium_cover_image, title, summary }) {
  return (
    <Wrapper>
      <picture>
        <img src={medium_cover_image} alt="이미지" />
      </picture>
      <MovieInfoContainer>
        <h2>{title}</h2>
        <p>{summary}</p>
      </MovieInfoContainer>
    </Wrapper>
  );
}

export default Movie;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease-in;
  > picture {
    position: relative;
    height: 50px;
    width: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  height: 250px;
`;

const MovieInfoContainer = styled.div`
  position: absolute;
  top: 10px;
  overflow: hidden;
  > h2 {
    color: black;
    font-size: 20px;
    background-color: white;
  }
  > p {
    color: grey;
  }
`;
