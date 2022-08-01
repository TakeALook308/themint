import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getAuctionList } from '../../../utils/api/getAuctionApi';

const Dropdown = ({ url, category }) => {
  const dropdownItems = [
    { value: 1, name: '최신순' },
    { value: 2, name: '가격순' },
    { value: 3, name: '인기순' },
    { value: 4, name: '판매자 신뢰도' },
  ];
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(1);
  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = async (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    setIsActive((prev) => !prev);
    const category = value;
    const res = await getAuctionList(`${url}}?word=&key=${category}&category=&pageno=`);
    return res?.data;
  };

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
        <DropdownSelect>정렬순서 🔻</DropdownSelect>
      </DropdownBody>
      <DropdownMenu isActive={isActive}>
        {dropdownItems.map((item) => (
          <DropdownItemContainer
            id="item"
            key={item.value}
            value={item.value}
            onClick={onSelectItem}>
            {item.name}
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;

export const DropdownContainer = styled.div`
  width: 12%;

  &:hover {
    cursor: pointer;
  }
`;

const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlack};
  padding: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.white};
`;

const DropdownSelect = styled.p`
  font-weight: bold;
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 12;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlack};
  position: absolute;
  opacity: 0.7;
  border: none;
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2px;

  &:last-child {
    border-bottom: none;
  }
`;
