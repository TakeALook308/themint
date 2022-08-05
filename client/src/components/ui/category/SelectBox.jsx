import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getAuctionList } from '../../../utils/api/getAuctionApi';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Dropdown = ({ key }) => {
  const dropdownItems = [
    { value: 1, name: '최신순' },
    { value: 2, name: '가격순' },
    { value: 3, name: '인기순' },
    { value: 4, name: '판매자 신뢰도' },
  ];
  const [sortName, setSortName] = useState('최신순');
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(1);
  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = async (e) => {
    setValue(e.target.value);
    setSortName(e.target.innerText);
    console.log(e.target.innerText);
    setIsActive((prev) => !prev);
    const key = value;
    const res = await getAuctionList(`/api/auction?word=&key=${key}&category=`);
    return res?.data;
  };

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownBody onClick={onActiveToggle}>
          <DropdownSelect>
            {sortName}
            <span>
              <ArrowDropDownIcon />
            </span>
          </DropdownSelect>
        </DropdownBody>
        <DropdownMenu isActive={isActive}>
          {dropdownItems.map((item) => (
            <DropdownItemContainer
              id="item"
              key={item.value}
              value={item.value}
              name={item.name}
              onClick={onSelectItem}>
              {item.name}
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
  width: 11%;
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
