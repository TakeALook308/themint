import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function StreamItem() {
  return (
    <Card>
      <CardText>
        <CardH3>Slide One</CardH3>
      </CardText>
      <CardContent>
        <p>Slide Contetent</p>
        <StyledLink to="/">갱매 참여</StyledLink>
      </CardContent>
    </Card>
  );
}

export default StreamItem;

const Card = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.pointGray};
  width: 450px;
  height: 300px;
  margin: 0;
`;

const CardContent = styled.div`
  widows: 400px;
  padding: 30px;
  box-sizing: border-box;
`;

const CardText = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.mainBlack};
`;

const CardH3 = styled.h3`
  color: ${(props) => props.theme.colors.white};
  font-size: 3em;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 10px 0 0;
  padding: 10px 20px;
  text-decoration: none;
  border: 2px solid #262626;
  color: #262626;
  font-weight: 600;
`;
