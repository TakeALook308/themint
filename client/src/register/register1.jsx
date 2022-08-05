import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getData, userApis } from '../utils/api/userApi';
import { REGISTER_MESSAGE, STANDARD } from '../utils/constants/constant';
import debounce from '../utils/functions/debounce';

function register1(props) {
  const [duplicatedID, setDuplicatedID] = useState(true);
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberId: '',
      memberName: '',
      nickname: '',
      pwd: '',
      email: '',
      address: '',
      phone: '',
    },
    mode: 'onChange',
  });

  const onValid = (data) => {
    console.log(data);
  };

  const password = useRef({});
  password.current = watch('pwd', '');

  const checkMemberId = async (e) => {
    const {
      target: { value },
    } = e;
    if (!value || value.length < STANDARD.ID_MIN_LENGTH) return;
    try {
      const response = await getData(userApis.ID_DUPLICATE_CHECK_API(value || value));
      if (response.status === 200) {
        setDuplicatedID(true);
        return true;
      }
    } catch {
      setError('memberId', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      setDuplicatedID(false);
    }
  };

  const onIdChange = async (value) => {
    processChange(value);
  };
  const processChange = debounce(async (value) => await checkMemberId(value));

  return <div></div>;
}

export default register1;
