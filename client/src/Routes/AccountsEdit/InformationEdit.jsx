import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BsFillPersonFill, BsHouseFill } from 'react-icons/bs';
import { MdOutlineSmartphone, MdMail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DefaultButton from '../../components/common/DefaultButton';
import { ActiveInput } from '../../style/style';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import { useForm } from 'react-hook-form';
import { MessageWrapper } from '../../style/common';
import ValidationMessage from '../../components/common/ValidationMessage';
import NicknameInput from './NicknameInput';

function InformationEdit({ userAllInfo, setUserAllInfo }) {
  return (
    <Container>
      <Information
        icon={<BsFillPersonFill />}
        textList={[userAllInfo.nickname]}
        onClick={() => console.log('fuck')}
        Component={NicknameInput}
      />
      <div>
        <MdOutlineSmartphone />
      </div>
      <Information
        icon={<MdMail />}
        textList={[userAllInfo.email]}
        onClick={() => console.log('fuck')}
        Component={EmailComponent}
      />
      <Information
        icon={<BsHouseFill />}
        textList={['05130', userAllInfo.address, userAllInfo.addressDetail]}
        onClick={() => console.log('fuck')}
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

const Information = ({ icon, textList, onClick, Component }) => {
  const [editMode, setEditMode] = useState(false);
  const changeInformation = () => {
    setEditMode(false);
    onClick();
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
            onClick={() => setEditMode(true)}
          />
        </NotEditMode>
      ) : (
        <Component text={textList} setEditMode={setEditMode} />
      )}
    </InformationContainer>
  );
};

const EmailComponent = ({ text }) => {
  const [nickname, setNickname] = useState(text[0]);
  const {
    register,
    setError,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  console.log(nickname);
  return (
    <>
      <ActiveInput active={true} style={{ width: '100%' }}>
        <input
          name="nickname"
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.value.target);
          }}
          autoComplete="off"
          maxLength={STANDARD.NAME_MAX_LENGTH}
          minLength={STANDARD.NAME_MIN_LENGTH}
          {...register('nickname', {
            required: REGISTER_MESSAGE.REQUIRED_NICKNAME,
            minLength: {
              value: STANDARD.NAME_MIN_LENGTH,
              message: REGISTER_MESSAGE.NICKNAME_LENGTH,
            },
            maxLength: {
              value: STANDARD.NAME_MAX_LENGTH,
              message: REGISTER_MESSAGE.ID_LENGTH,
            },
            pattern: {
              value: REGEX.NICKNAME,
              message: REGISTER_MESSAGE.NICKNAME_STANDARD,
            },
            // validate: debounceCheckNickname,
          })}
          placeholder=" "
          required
        />
        <label htmlFor="nickname">닉네임</label>
      </ActiveInput>
      <MessageWrapper>
        <ValidationMessage text={errors?.nickname?.message} state={'fail'} />
        {watch().nickname && !errors?.nickname && (
          <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_NICKNAME} state={'pass'} />
        )}
      </MessageWrapper>
    </>
  );
};

const AddressComponent = () => {
  return <input />;
};

const TextConatiners = styled.div`
  width: 100%;
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
