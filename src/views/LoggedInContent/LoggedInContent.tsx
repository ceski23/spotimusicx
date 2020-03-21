import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Sidebar } from 'components/Sidebar';
import { renderRoutes } from 'react-router-config';
import { loggedInRoutes } from 'routes';
import { PlayerBar } from 'components/PlayerBar';
import { useSpotify } from 'hooks/useSpotify';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  overflow: scroll;
`;

export const LoggedInContent: FC = (): ReactElement => {
  useSpotify();

  return (
    <Container>
      <Sidebar />

      <Content>
        {renderRoutes(loggedInRoutes)}
      </Content>

      <PlayerBar />
    </Container>
  );
};
