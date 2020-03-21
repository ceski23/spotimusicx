import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-bottom: 100px;
  width: 100%;
  color: rgba(255, 255, 255, 0.7);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 10em;
`;

const Text = styled.h3`
  margin: 0;
  font-size: 3em;
`;

export const NotFound: FC = (): ReactElement => (
  <Container>
    <Title>404</Title>
    <Text>Nie znaleziono strony</Text>
  </Container>
);
