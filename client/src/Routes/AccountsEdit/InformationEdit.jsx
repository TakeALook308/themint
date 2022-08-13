import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillPersonFill, BsHouseFill } from 'react-icons/bs';
import { MdOutlineSmartphone, MdMail } from 'react-icons/md';
import { AiFillDollarCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import NicknameInput from './NicknameInput';
import EmaiInput from './EmaiInput';
import AddressInput from './AddressInput';
import AccountInput from './AccountInput';
import { MemoizedInformation } from './Information';

function InformationEdit({ userAllInfo }) {
  const navigate = useNavigate();
  return (
    <Container>
      <MemoizedInformation
        icon={<BsFillPersonFill aria-label="닉네임" />}
        textList={[userAllInfo?.nickname]}
        Component={NicknameInput}
        userAllInfo={userAllInfo}
      />
      <MemoizedInformation
        icon={<MdOutlineSmartphone aria-label="휴대전화" />}
        textList={[userAllInfo?.phone]}
        onClick={() => navigate('/accounts/phone-number')}
      />
      <MemoizedInformation
        icon={<MdMail aria-label="이메일" />}
        textList={[userAllInfo?.email]}
        Component={EmaiInput}
        userAllInfo={userAllInfo}
      />
      <MemoizedInformation
        icon={<AiFillDollarCircle aria-label="계좌번호" />}
        textList={[userAllInfo?.bankCode, userAllInfo?.accountNo]}
        Component={AccountInput}
        userAllInfo={userAllInfo}
        type={'account'}
      />
      <MemoizedInformation
        icon={<BsHouseFill aria-label="주소" />}
        textList={[userAllInfo?.zipCode, userAllInfo?.address, userAllInfo?.addressDetail]}
        Component={AddressInput}
        userAllInfo={userAllInfo}
      />
    </Container>
  );
}

export default InformationEdit;

const Container = styled.article`
  width: 100%;
  border: ${(props) => `1px solid ${props.theme.colors.pointGray}`};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;
