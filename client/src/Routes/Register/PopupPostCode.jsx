import React from 'react';
import DaumPostcode from 'react-daum-postcode';

function PopupPostCode({ onClose, setAddress }) {
  const handlePostCode = (data) => {
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
    setAddress('zipCode', data.zonecode);
    setAddress('address', fullAddress);
    onClose();
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
    </div>
  );
}

export default PopupPostCode;

const postCodeStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
  width: '600px',
  height: '600px',
  padding: '7px',
  zIndex: 11,
};
