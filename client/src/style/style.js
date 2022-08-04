import styled from 'styled-components';

export const ActiveInput = styled.div`
  position: relative;
  & input {
    background-color: ${(props) => props.theme.colors.pointBlack};
    height: 40px;
    border: none;
    border-radius: 5px;
    padding: ${(props) => (props.active ? '15px 10px 10px' : '10px')};
    color: ${(props) => props.theme.colors.white};
    width: 100%;
    outline: none;

    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      transform: translateY(-9px);
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
