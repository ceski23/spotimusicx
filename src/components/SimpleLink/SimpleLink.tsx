/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  className?: any;
}

const Container = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SimpleLink: FC<Props> = ({ to, children, ...props }): ReactElement => (
  <Container
    to={to}
    onClick={(event) => event.stopPropagation()}
    {...props}
  >
    {children}
  </Container>
);
