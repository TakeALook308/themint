import React, { useState } from 'react';
import styled from 'styled-components';

function Modal2(props) {
  const { open, close, title } = props;
  return (
    <div>
      {open ? (
        <Background onClick={close}>
          <section onClick={(e) => e.stopPropagation()}>
            <header>
              <p>{title}</p>
              <span onClick={close}>x</span>
            </header>
            <main>{props.children}</main>
          </section>
        </Background>
      ) : null}
    </div>
  );
}

const Background = styled.div`
  background-color: rgba(13, 12, 15, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;

  & section {
    width: 90%;
    max-width: 700px;

    background-color: ${(props) => props.theme.colors.subBlack};

    & header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      & p {
        font-size: 24px;
        font-weight: 700;
      }
      & span {
        cursor: pointer;
      }
    }

    & main {
      padding: 0 20px 20px;
    }
  }
`;
export default Modal2;
