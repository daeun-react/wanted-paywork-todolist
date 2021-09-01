import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Loading } from 'assets/svg/loading.svg';

interface ISpinnerProps {}

const Spinner: React.FC<ISpinnerProps> = (props) => {
  return (
    <SpinnerWrapper>
      <Loading width="100" height="100" />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    fill: ${({ theme }) => theme.color.lightGray};
    animation: spin 2s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

export default Spinner;
