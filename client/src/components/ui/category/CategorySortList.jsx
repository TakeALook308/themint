import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function SortList() {
  const selectList = ['1', '2', '3', '4'];
  const [sort, setSort] = useState('1');
  const handleSort = (e) => {
    setSort(e.target.value);
    axios
      .get('url', {
        params: {
          key: 1,
        },
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  };

  return (
    <Container>
      <SelectBox onChange={handleSort} value={sort}>
        {selectList.map((item) => (
          <OptionBox value={item} key={item}>
            {item}
          </OptionBox>
        ))}
      </SelectBox>
    </Container>
  );
}

export default SortList;
const Container = styled.container`
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  display: flex;
  justify-content: end;
`;
const SelectBox = styled.select`
  width: 10%;
`;
const OptionBox = styled.option`
  width: 10%;
  background-color: ${(props) => props.theme.colors.mainBlack};
  opacity: 0.7;
`;
