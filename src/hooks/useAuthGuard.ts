import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'store';
import { fetchMe } from 'features/auth/api';
import { useState, useEffect } from 'react';
import { setUser, selectAccessToken } from 'features/auth/slice';

export enum AuthState {
  AUTHORIZED, UNAUTHORIZED, PENDING
}

export const useAuthGuard = () => {
  const [loggedIn, setLoggedIn] = useState<AuthState>(AuthState.PENDING);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (accessToken === undefined) setLoggedIn(AuthState.UNAUTHORIZED);

    else if (accessToken) {
      fetchMe()
        .then((user) => {
          dispatch(setUser(user));
          setLoggedIn(AuthState.AUTHORIZED);
        })
        .catch(() => { setLoggedIn(AuthState.UNAUTHORIZED); });
    }
  }, [accessToken, dispatch]);

  return loggedIn;
};
