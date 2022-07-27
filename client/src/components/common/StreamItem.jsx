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

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.pointBlack};
  color: ${(props) => props.theme.colors.white};
`;

const Card = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.pointGray};
  width: 400px;
  height: 500px;
  margin: 0 auto;
`;

const CardContent = styled.div`
  widows: 400px;
  padding: 30px;
  box-sizing: border-box;
`;

const CardText = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
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
