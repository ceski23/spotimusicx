/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Vibrant from 'node-vibrant';
import {
  selectSpotifyState, setState, setDeviceId, setTrack, setTrackColor, setPlayer,
} from 'features/spotify/slice';
import { State } from 'features/spotify/types';
import { selectAuthData } from 'features/auth/slice';
import { useHistory } from 'react-router-dom';
import { transferPlayback } from 'features/player/slice';
import { ROUTE_LOGIN } from 'routes';

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
  const { player } = useSelector(selectSpotifyState);
  const { accessToken } = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const history = useHistory();

  const setupStateListeners = () => {
    const playerReadyListener = ({ device_id }: {device_id: string}) => {
      dispatch(setDeviceId(device_id));
    };

    const stateChangedListener = (currentState: State) => {
      dispatch(setState(currentState));
      dispatch(setTrack(currentState.track_window.current_track));

      const image = currentState.track_window.current_track.album.images[0].url;
      Vibrant.from(image).getPalette().then((palette) => {
        dispatch(setTrackColor(palette.Vibrant?.getHex()));
      });
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

  const setupStateFetching = (interval: number) => {
    if (!timer && player) {
      setTimer(setInterval(() => {
        if (player) {
          player.getCurrentState().then((currentState: State) => {
            dispatch(setState(currentState));
          });
        }
      }, interval));
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  };

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
      history.push(ROUTE_LOGIN);
    }
  };

  useEffect(setupStateFetching(1000), [player, timer]);
  useEffect(setupStateListeners, [dispatch, player]);
  useEffect(() => { setupPlayer(); }, [accessToken, dispatch, history, player, setPlayer]);
};
