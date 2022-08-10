import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { IoCaretDownOutline } from 'react-icons/io5';

const Dropdown = ({ getSortKey }) => {
  const dropdownItems = [
    { value: 'startTime', name: '경매임박순' },
    { value: 'seq', name: '최신등록순' },
    { value: 'interest', name: '인기순' },
    { value: 'score', name: '판매자신뢰도순' },
  ];
  const [sortName, setSortName] = useState('경매임박순');
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('startTime');
  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = (e) => {
    console.log(e.target.id);
    console.log(e.target.innerText);
    setValue(e.target);
    setSortName(e.target.innerText);
    setIsActive((prev) => !prev);
    getSortKey(e.target.id);
  };

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownBody onClick={onActiveToggle}>
          <DropdownSelect>
            {sortName}
            <span>
              <IoCaretDownOutline />
            </span>
          </DropdownSelect>
        </DropdownBody>
        <DropdownMenu isActive={isActive}>
          {dropdownItems.map((dropdownItems) => (
            <DropdownItemContainer
              id={dropdownItems.value}
              key={dropdownItems.value}
              value={dropdownItems.value}
              name={dropdownItems.name}
              onClick={onSelectItem}>
              {dropdownItems.name}
            </DropdownItemContainer>
          ))}
        </DropdownMenu>
      </DropdownContainer>
    </Wrapper>
  );
};

export default Dropdown;

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;

export const DropdownContainer = styled.main`
  width: 12%;

  &:hover {
    cursor: pointer;
  }
`;

const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlack};
  padding: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.white};
  z-index: 5;
`;

const DropdownSelect = styled.p`
  font-weight: bold;
  > span {
    position: absolute;
    right: 0px;
  }
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  margin-top: 5px;
  width: 12%;
  height: 100px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlack};
  position: absolute;
  opacity: 0.7;
  border-radius: 5px;
  z-index: 5;
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
