import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1024px;
  min-height: ${(props) => (props.nonMember ? '100vh' : 'calc(100vh - 261px)')};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: ${(props) => !props.nonMember && '80px'};
  scroll-behavior: smooth;
`;

export const MessageWrapper = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
