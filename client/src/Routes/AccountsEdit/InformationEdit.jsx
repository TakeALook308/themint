import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFillPersonFill, BsHouseFill } from 'react-icons/bs';
import { MdOutlineSmartphone, MdMail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../../components/common/DefaultButton';
import NicknameInput from './NicknameInput';
import { patchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import EmaiInput from './EmaiInput';

function InformationEdit({ userAllInfo, setUserAllInfo }) {
  const navigate = useNavigate();
  return (
    <Container>
      <Information
        icon={<BsFillPersonFill />}
        textList={[userAllInfo.nickname]}
        Component={NicknameInput}
        setUserAllInfo={setUserAllInfo}
      />
      <Information
        icon={<MdOutlineSmartphone />}
        textList={[userAllInfo.phone]}
        onClick={() => navigate('/accounts/phone-number')}
      />
      <Information
        icon={<MdMail />}
        textList={[userAllInfo.email]}
        Component={EmaiInput}
        setUserAllInfo={setUserAllInfo}
      />
      <Information
        icon={<BsHouseFill />}
        textList={['05130', userAllInfo.address, userAllInfo.addressDetail]}
        Component={AddressComponent}
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
  min-height: 72px;
`;

const Information = ({ icon, textList, onClick, Component, setUserAllInfo }) => {
  const [editMode, setEditMode] = useState(false);
  const changeInformation = async (prop) => {
    setEditMode(false);
    try {
      const response = await patchData(userApis.INFORMATION_CHANGE, { prop });
      if (response.status === 200) {
        setUserAllInfo((prev) => ({ ...prev, prop }));
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
          <TextConatiners>
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

const AddressComponent = () => {
  return <input />;
};

const TextConatiners = styled.div`
  width: 80%;
  p {
    &:not(:first-child) {
      line-height: 2;
    }
  }
`;

const InformationContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  > p {
    padding-top: 0.7rem;
  }
  min-height: 72px;
`;

const NotEditMode = styled.div`
  padding-top: 0.7rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
