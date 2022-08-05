import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1024px;
  min-height: ${(props) => (props.nonMember ? '100vh' : 'calc(100vh - 261px)')};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: ${(props) => !props.nonMember && '70px'};
`;

export const WarningMessage = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.pointRed};
`;

export const MessageWrapper = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;
