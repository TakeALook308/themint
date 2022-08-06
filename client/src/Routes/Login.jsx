import React from 'react';
import SignContainer from '../components/common/SignContainer';
import { PAGES } from '../utils/constants/constant';
import { useForm } from 'react-hook-form';

function Login(props) {
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberId: '',
      pwd: '',
    },
    mode: 'onChange',
  });
  return <SignContainer pageName={PAGES.LOGIN}></SignContainer>;
}

export default Login;
