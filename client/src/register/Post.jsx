import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const Post = ({ setcompany }) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    setcompany((prev) => ({ ...prev, address: fullAddress }));
  };

  return (
    <Container>
      <PostModal autoClose onComplete={complete} />
    </Container>
  );
};

export default Post;

const Container = styled.div`
  position: relative;
`;

const PostModal = styled(DaumPostcode)`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 50px;
  z-index: 15;
`;
