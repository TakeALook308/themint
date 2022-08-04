import React from 'react';
import styled from 'styled-components';
import * as Common from '../style/common';
import { useForm } from 'react-hook-form';

function Register(props) {
  const { register } = useForm();
  console.log(register('todo'));
  return (
    <Common.Container>
      회원가입
      <div></div>
    </Common.Container>
  );
}

export default Register;
