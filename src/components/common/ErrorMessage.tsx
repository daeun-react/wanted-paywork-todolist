import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Fix } from 'assets/svg/fix.svg';

interface IErrorMessageProps {
  msg: string;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ msg }) => {
  return (
    <Wrapper>
      <Fix width="150" height="150" />
      <Text>{msg}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  svg {
    margin-bottom: 16px;
    fill: ${({ theme }) => theme.color.lightGray};
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.lightGray};
`;

export default ErrorMessage;
