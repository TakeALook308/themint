import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 80px;
  min-height: calc(100vh - 261px);
`;

export const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
`;

export const ActiveInput = styled.div`
  position: relative;
  width: 100%;
  & input {
    background-color: ${(props) => props.theme.colors.pointBlack};
    height: 40px;
    border: none;
    border-radius: 5px;
    padding: ${(props) => (props.active ? '20px 10px 10px' : '10px')};
    color: ${(props) => props.theme.colors.white};
    width: 100%;
    outline: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      transform: translateY(-6px);
      font-size: 10px;
    }

    & + label {
      display: inline-block;
      height: 40px;
      position: absolute;
      left: 0;
      padding: 10px;
      pointer-events: none;
      transition: 0.5s;
      color: ${(props) => props.theme.colors.textGray};
    }
  }
`;
