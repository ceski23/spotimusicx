/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, ReactElement } from 'react';
import buildUrl from 'build-url';

export const Authorize: FC = (): ReactElement => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-modify-playback-state',
    'streaming',
    'user-top-read',
    'user-library-read',
  ];

  const authUrl = buildUrl('https://accounts.spotify.com/', {
    path: 'authorize',
    queryParams: {
      client_id: 'aae8fb6007ab449190cdd5876f1b9fce',
      response_type: 'token',
      redirect_uri: `${window.location.origin}/authorize`,
      // redirect_uri: `${window.location.origin}/index.html#/authorize`,
      scope: scopes.join(' '),
    },
  });

  window.location.href = authUrl;

  return <></>;
};
