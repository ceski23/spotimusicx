import React, { FC, ReactElement } from 'react';
import { User as UserType } from 'features/auth/types';
import styled from '@emotion/styled';

interface Props {
  user: UserType;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Name = styled.p`
  margin: 0;
  margin-left: 20px;
  color: white;
`;

export const User: FC<Props> = ({ user }): ReactElement => (
  <Container>
    <Image src={user.images[0].url} alt={user.display_name} />
    <Name>{user.display_name}</Name>
  </Container>
);
