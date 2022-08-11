import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myInformationState } from '../../atoms';
import { errorToast, successToast } from '../../lib/toast';
import { postData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';

function ProfileImage({ src }) {
  const [files, setFiles] = useState({
    file: '',
    imagePreviewUrl: '',
  });
  const myInformation = useRecoilValue(myInformationState);
  const deleteFileImage = () => {
    URL.revokeObjectURL(files.imagePreviewUrl);
  };

  const requestProfileImage = async (image) => {
    try {
      const res = await postData(userApis.PROFILE_IMAGE_CHANGE, image, {
        headers: {
          'Content-Type': 'multipart/form-data:',
        },
      });

      setFiles((prev) => ({
        ...prev,
        imagePreviewUrl: process.env.REACT_APP_IMAGE_URL + res?.data,
      }));
      successToast('프로필 이미지 변경✅');
    } catch (err) {
      errorToast('프로필 이미지 변경에 실패하였습니다.');
    }
  };

  const isValidSize = (image) => {
    if (image.size > 5242880) {
      errorToast('5MB 이하의 크기의 사진을 넣어주세요.');
      return false;
    }
    return true;
  };

  const photoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = e.target.files[0];
    if (!isValidSize(file)) return;
    formData.append('multipartFile', file);
    await requestProfileImage(formData);
  };

  useEffect(() => {
    if (src) {
      setFiles({
        files: '',
        imagePreviewUrl: process.env.REACT_APP_IMAGE_URL + src,
      });
    }
    return () => deleteFileImage();
  }, [src]);

  return (
    <div>
      <div>
        <form>
          <CustomFileUpload htmlFor="photo-upload">
            <ImageWrapper>
              {src && (
                <Img
                  htmlFor="photo-upload"
                  src={files.imagePreviewUrl}
                  alt={`${myInformation.nickname} 프로필 이미지`}
                />
              )}
            </ImageWrapper>
            <FileInput
              id="photo-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={photoUpload}
            />
          </CustomFileUpload>
        </form>
      </div>
      <div>
        <p>이름</p>
        <p>아이디</p>
      </div>
    </div>
  );
}

export default ProfileImage;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  &[type='file'] {
    display: none;
  }
  border-radius: 15px;
  border: 1px solid #b7b7b7;
  padding: 5px 5px 5px 10px;
  font-size: 18px;
  transition: 0.2s;
`;

const CustomFileUpload = styled.label`
  border-radius: 50%;
  display: inline-block;
  position: relative;
  padding: 6px;
  cursor: pointer;
  background: ${(props) => props.theme.colors.gradientMainMintToSubMint};
  &:before {
    content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="teal" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/></svg>');
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #63d3a6;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border-radius: 50%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: #fff;
  }
  &:hover:before {
    z-index: 1;
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
`;
