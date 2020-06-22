import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import Spinner from 'react-spinners/BounceLoader';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 40px 0;
`;

export const Loading: FC = (): ReactElement => (
  <Container>
    <Spinner size={50} color="#fff" />
  </Container>
);
