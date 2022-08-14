import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import DefaultButton from '../../components/common/DefaultButton';
import { errorToast, successToast } from '../../lib/toast';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { MemoizedAccountText } from './AccountText';
import { MemoizedTextConatiner } from './TextContainer';

const Information = ({ icon, textList, onClick, Component, userAllInfo, type }) => {
  const [editMode, setEditMode] = useState(false);
  const onChangeInformation = async (user) => {
    const userInfo = { ...userAllInfo, ...user };
    const response = await fetchData.patch(userApis.INFORMATION_CHANGE, userInfo);
    return { response, user };
  };
  const changeInformation = async (prop) => {
    mutation.mutate(prop);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation((user) => onChangeInformation(user), {
    onSuccess: (data) => {
      queryClient.setQueryData(['userInformation'], (prev) => ({ ...prev, ...data.user }));
      successToast('변경에 성공하였습니다.');
      setEditMode(false);
    },

    onError: (err) => {
      errorToast('변경에 실패하였습니다.');
    },
  });
  return (
    <InformationContainer>
      <p>{icon}</p>
      {!editMode ? (
        <NotEditMode>
          {type === 'account' ? (
            <MemoizedAccountText textList={textList} />
          ) : (
            <TextConatiners type={type}>
              <MemoizedTextConatiner textList={textList} />
            </TextConatiners>
          )}
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

export const MemoizedInformation = React.memo(Information);

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
