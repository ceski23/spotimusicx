import React, { useEffect } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from 'theme';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { LoggedInContent } from 'views/LoggedInContent';
import { renderRoutes } from 'react-router-config';
import { guestRoutes } from 'routes';
import { updateAuthHeader } from 'api';
import { selectAuthData } from 'features/auth/slice';
import { setColor, selectSpotifyState } from 'features/spotify/slice';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ color }) => `linear-gradient(135deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.62)), ${color}`};
  min-height: 100vh;
  transition: background 0.5s;
`;

export const App = withRouter(({ history }) => {
  const { color } = useSelector(selectSpotifyState);
  const { accessToken } = useSelector(selectAuthData);
  const dispatch = useDispatch();

  useEffect(() => {
    updateAuthHeader(accessToken);
  }, [accessToken]);

  const { loggedIn, loading } = useAuthGuard();

  useEffect(() => {
    history.listen(() => {
      dispatch(setColor('#00d663'));
    });
  }, [dispatch, history]);

  return (
    <ThemeProvider theme={theme}>
      <Container color={color}>
        {!loading && (
          loggedIn ? <LoggedInContent /> : renderRoutes(guestRoutes)
        )}
      </Container>
    </ThemeProvider>
  );
});
