/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Vibrant from 'node-vibrant';
import {
  setState, setDeviceId, setTrackColor, setPlayer, selectPlayer, selectPlaybackState,
} from 'features/spotify/slice';
import { selectAccessToken } from 'features/auth/slice';
import { useHistory } from 'react-router-dom';
import { transferPlayback } from 'features/player/slice';
import { ROUTE_LOGIN } from 'routes';
import { State } from 'features/apiTypes';
import useInterval from '@use-it/interval';

export const waitForSpotifyWebPlaybackSDKToLoad = async () => (
  new Promise((resolve) => {
    if (window.Spotify) resolve(window.Spotify);
    else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(window.Spotify);
      };
    }
  })
);

export const useSpotify = () => {
  const player = useSelector(selectPlayer);
  const accessToken = useSelector(selectAccessToken);
  const state = useSelector(selectPlaybackState);
  const dispatch = useDispatch();
  const history = useHistory();

  const setupStateListeners = () => {
    const playerReadyListener = ({ device_id }: {device_id: string}) => {
      dispatch(setDeviceId(device_id));
    };

    const stateChangedListener = (currentState?: State) => {
      if (currentState && currentState.track_window.current_track) {
        if (Number.isInteger(currentState.position)) {
          dispatch(setState(currentState));

          const image = currentState.track_window.current_track.album.images[0].url;
          Vibrant.from(image).getPalette().then((palette) => {
            dispatch(setTrackColor(palette.Vibrant?.getHex()));
          });
        }
      }
    };

    if (player) {
      player.addListener('player_state_changed', stateChangedListener);
      player.addListener('ready', playerReadyListener);
    }

    return () => {
      if (player) {
        player.removeListener('player_state_changed', stateChangedListener);
        player.removeListener('ready', playerReadyListener);
      }
    };
  };

  const setupPlayer = useCallback(async () => {
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
      history.push(ROUTE_LOGIN);
    }
  }, [accessToken, dispatch, history, player]);

  useEffect(setupStateListeners, [setupStateListeners]);
  useEffect(() => { setupPlayer(); }, [setupPlayer]);

  useInterval(() => {
    if (player) {
      player.getCurrentState().then((currentState: State) => {
        if (Number.isInteger(currentState.position)) dispatch(setState(currentState));
      });
    }
  }, state?.paused === false ? 1000 : null);
};
