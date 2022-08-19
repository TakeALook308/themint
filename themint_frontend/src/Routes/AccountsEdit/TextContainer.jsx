import React from 'react';

function TextContainer({ textList, type }) {
  return (
    <>
      {textList?.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </>
  );
}

export const MemoizedTextConatiner = React.memo(TextContainer);
