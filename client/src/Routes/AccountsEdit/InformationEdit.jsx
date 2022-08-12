import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillPersonFill, BsHouseFill } from 'react-icons/bs';
import { MdOutlineSmartphone, MdMail } from 'react-icons/md';
import { AiFillDollarCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../../components/common/DefaultButton';
import NicknameInput from './NicknameInput';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import EmaiInput from './EmaiInput';
import AddressInput from './AddressInput';
import { bankList } from '../../utils/constants/bankList';
import AccountInput from './AccountInput';

function InformationEdit({ userAllInfo, setUserAllInfo }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Information
        icon={<BsFillPersonFill aria-label="닉네임" />}
        textList={[userAllInfo.nickname]}
        Component={NicknameInput}
        setUserAllInfo={setUserAllInfo}
        userAllInfo={userAllInfo}
      />
      <Information
        icon={<MdOutlineSmartphone aria-label="휴대전화" />}
        textList={[userAllInfo.phone]}
        onClick={() => navigate('/accounts/phone-number')}
      />
      <Information
        icon={<MdMail aria-label="이메일" />}
        textList={[userAllInfo.email]}
        Component={EmaiInput}
        setUserAllInfo={setUserAllInfo}
        userAllInfo={userAllInfo}
      />
      <Information
        icon={<AiFillDollarCircle aria-label="계좌번호" />}
        // textList={[userAllInfo.backCode, userAllInfo.accountNo]}
        textList={[2, '01032359083']}
        Component={AccountInput}
        setUserAllInfo={setUserAllInfo}
        userAllInfo={userAllInfo}
        type={'account'}
      />
      <Information
        icon={<BsHouseFill aria-label="주소" />}
        textList={[userAllInfo.zipCode, userAllInfo.address, userAllInfo.addressDetail]}
        Component={AddressInput}
        setUserAllInfo={setUserAllInfo}
        userAllInfo={userAllInfo}
      />
    </Container>
  );
}

export default InformationEdit;

const Information = ({ icon, textList, onClick, Component, setUserAllInfo, userAllInfo, type }) => {
  const [editMode, setEditMode] = useState(false);
  const changeInformation = async (prop) => {
    setEditMode(false);
    const userInfo = { ...userAllInfo, ...prop };
    try {
      const response = await fetchData.patch(userApis.INFORMATION_CHANGE, userInfo);
      if (response.status === 200) {
        setUserAllInfo({ ...userInfo });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InformationContainer>
      <p>{icon}</p>
      {!editMode ? (
        <NotEditMode>
          <TextConatiners type={type}>
            {textList?.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </TextConatiners>
          <DefaultButton
            title={'수정'}
            type="button"
            widthValue="70px"
            onClick={onClick ? onClick : () => setEditMode(true)}
          />
        </NotEditMode>
      ) : (
        <Component
          text={textList}
          setEditMode={setEditMode}
          changeInformation={changeInformation}
        />
      )}
    </InformationContainer>
  );
};

const Container = styled.article`
  width: 100%;
  border: ${(props) => `1px solid ${props.theme.colors.pointGray}`};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const TextConatiners = styled.div`
  width: 80%;
  display: ${(props) => props.type === 'account' && 'flex'};
  > p {
    &:not(:first-child) {
      line-height: 2;
    }
  }
`;

const InformationContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  min-height: 72px;
`;

const NotEditMode = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const AccountContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  p {
    line-height: 1;
  }
`;
