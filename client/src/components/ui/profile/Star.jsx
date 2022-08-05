import React from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

// 별점에 따라서 아이콘을 출력하는 함수입니다.

const StarRating = ({ rating, color = 'FFDA7B' }) => {
  return (
    <>
      {Array(parseInt(rating))
        .fill(2)
        .map((el, i) => (
          <BsStarFill key={i} size="15" color={color} />
        ))}
      {rating % 1 !== 0 && <BsStarHalf size="15" color={color} />}
      {Array(Math.floor(5 - rating))
        .fill(2)
        .map((el, i) => (
          // 아웃라인 노란색으로 바꾸기
          <BsStarFill key={i} size="15" color="black" />
        ))}
    </>
  );
};

export default StarRating;
