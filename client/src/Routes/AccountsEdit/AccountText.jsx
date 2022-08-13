import React, { useEffect, useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import styled from 'styled-components';
import { bankList } from '../../utils/constants/bankList';

function AccountText({ textList }) {
  const [bank, setBank] = useState({ bankName: '', bankCode: null });
  useEffect(() => {
    const bankIndex = bankList.findIndex((bank) => bank?.bankCode === textList[0]);
    const bankInfo = bankList[bankIndex];
    setBank(bankInfo);
  }, [textList]);

  return (
    <Container>
      <p>{bank?.bankName}</p>
      <p>{textList[1]}</p>
    </Container>
  );
}

export const MemoizedAccountText = React.memo(AccountText);

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;
