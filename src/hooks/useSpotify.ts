/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Vibrant from 'node-vibrant';
import {
  selectSpotifyState, setState, setDeviceId, setTrack, setTrackColor,
} from 'features/spotify/slice';
import { State } from 'features/spotify/types';

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
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (!timer && player) {
      setTimer(setInterval(() => {
        if (player) {
          player.getCurrentState().then((currentState: State) => {
            dispatch(setState(currentState));
          });
        }
      }, 1000));
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [player, timer]);

  useEffect(() => {
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
  }, [dispatch, player]);

  return { player };
};
