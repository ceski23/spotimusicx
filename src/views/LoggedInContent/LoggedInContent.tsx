import React, { FC, ReactElement } from 'react';
import { Player } from 'components/Player';
import styled from '@emotion/styled';
import { Sidebar } from 'components/Sidebar';
import { renderRoutes } from 'react-router-config';
import { loggedInRoutes } from 'routes';
import { PlayerBar } from 'components/PlayerBar';

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

export const LoggedInContent: FC = (): ReactElement => (
  <Container>
    <Player />
    <Sidebar />

    <Content>
      {renderRoutes(loggedInRoutes)}
    </Content>

    <PlayerBar />
  </Container>
);
