import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { setAccessToken, selectAuthData } from 'features/auth/slice';
import { Redirect } from 'react-router-dom';

export const AuthCallback: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuthData);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const parsed = queryString.parse(location.hash, {});
    const token = parsed.access_token as string;
    if (token) dispatch(setAccessToken(token));
  }, [dispatch]);

  return accessToken ? <Redirect to="/" /> : <></>;
};
