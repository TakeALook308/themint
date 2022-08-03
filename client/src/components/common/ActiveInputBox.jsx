import React from 'react';
import { ActiveInput } from '../../style/style';

function ActiveInputBox({ text, name, type, placeholder, required }) {
  return (
    <ActiveInput active={text ? true : false}>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || ' '}
        required={required}
      />
      {text ? <label for={name}>{text}</label> : null}
    </ActiveInput>
  );
}

export default ActiveInputBox;
