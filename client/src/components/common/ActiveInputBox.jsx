import React from 'react';
import { ActiveInput } from '../../style/style';

function ActiveInputBox({
  text,
  name,
  type,
  value,
  placeholder,
  required,
  onChange,
  disabled = false,
  register,
}) {
  return (
    <ActiveInput active={text ? true : false}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder || ' '}
        required={required}
        onChange={onChange}
        disabled={disabled}
        {...register}
      />
      {text ? <label htmlFor={name}>{text}</label> : null}
    </ActiveInput>
  );
}

export default ActiveInputBox;
