import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { setAccessToken } from 'features/auth/slice';

export const AuthCallback: FC = (): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const parsed = queryString.parse(location.hash, {});
    const token = parsed.access_token as string;
    if (token) dispatch(setAccessToken(token));
  }, [dispatch]);

  return <></>;
};
