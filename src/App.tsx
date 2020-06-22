import React, { useEffect } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from 'theme';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import { useAuthGuard, AuthState } from 'hooks/useAuthGuard';
import { LoggedInContent } from 'views/LoggedInContent';
import { renderRoutes } from 'react-router-config';
import { guestRoutes } from 'routes';
import { updateAuthHeader } from 'api';
import { selectAccessToken } from 'features/auth/slice';
import { setColor, selectColor } from 'features/spotify/slice';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ color }) => `linear-gradient(135deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.62)), ${color}`};
  min-height: 100vh;
  transition: background 0.5s;
`;

export const App = withRouter(({ history }) => {
  const color = useSelector(selectColor);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    updateAuthHeader(accessToken);
  }, [accessToken]);

  const authState = useAuthGuard();

  useEffect(() => {
    history.listen(() => {
      dispatch(setColor('#00d663'));
    });
  }, [dispatch, history]);

  return (
    <ThemeProvider theme={theme}>
      <Container color={color}>
        {authState === AuthState.AUTHORIZED && <LoggedInContent />}
        {authState === AuthState.UNAUTHORIZED && renderRoutes(guestRoutes)}
      </Container>
    </ThemeProvider>
  );
});
