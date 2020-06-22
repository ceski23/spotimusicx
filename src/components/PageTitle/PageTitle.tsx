import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 0 auto 50px;
  display: flex;
  width: 90%;
  padding-top: 50px;
`;

const Title = styled.div`
  color: white;
  padding-bottom: 5px;
  font-weight: 500;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-size: 1.7em;
  text-decoration: none;
  margin: 0 20px;
  transition: 0.3s;
  border-bottom: 3px solid transparent;
`;

export const PageTitle: FC = ({ children }): ReactElement => (
  <Container>
    <Title>{children}</Title>
  </Container>
);
