/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import React, { FC, ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthData } from 'features/auth/slice';
import { selectSpotifyState, setPlayer } from 'features/spotify/slice';
import { waitForSpotifyWebPlaybackSDKToLoad } from 'hooks/useSpotify';
import { useHistory } from 'react-router-dom';
import { transferPlayback } from 'features/player/slice';

export const Player: FC = (): ReactElement => {
  const { accessToken } = useSelector(selectAuthData);
  const { player } = useSelector(selectSpotifyState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        if (!player && accessToken) {
          const sdk: any = await waitForSpotifyWebPlaybackSDKToLoad();

          const newPlayer = new sdk.Player({
            name: 'SpotiMusicX',
            getOAuthToken: (callback: (token: string) => void) => callback(accessToken),
          });

          newPlayer.on('initialization_error', ({ message }: any) => { alert(message); });
          newPlayer.on('authentication_error', ({ message }: any) => { alert(message); });
          newPlayer.on('account_error', ({ message }: any) => { alert(message); });
          newPlayer.on('playback_error', ({ message }: any) => { alert(message); });

          const connected = await newPlayer.connect();

          if (connected) {
            newPlayer.addListener('ready', ({ device_id }: any) => {
              dispatch(transferPlayback(device_id));
              newPlayer.removeListener('ready');
            });

            dispatch(setPlayer(newPlayer));
          }
        }
      } catch (error) {
        history.push('/login');
      }
    };
    setupPlayer();
  }, [accessToken, dispatch, history, player, setPlayer]);

  return <></>;
};
