import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'store';
import { fetchMe } from 'features/auth/api';
import { useState, useEffect } from 'react';
import { setUser, selectAuthData } from 'features/auth/slice';

export const useAuthGuard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useSelector(selectAuthData);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      setLoggedIn(true);
      fetchMe()
        .then((user) => dispatch(setUser(user)))
        .catch(() => { setLoggedIn(false); });
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, [accessToken]);

  return { loggedIn, loading };
};
