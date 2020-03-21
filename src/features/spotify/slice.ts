/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { State, Track } from './types';

interface SpotifyState {
  player?: any;
  color: string;
  state?: State;
  deviceId?: string;
  track?: Track;
  trackColor?: string;
}

export const initialState: SpotifyState = {
  color: '#00d663',
};

export const slice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setPlayer: (state, { payload }: PayloadAction<any>) => {
      state.player = payload;
    },
    setColor: (state, { payload }: PayloadAction<string>) => {
      state.color = payload;
    },
    setState: (state, { payload }: PayloadAction<State>) => {
      state.state = payload;
    },
    setDeviceId: (state, { payload }: PayloadAction<string>) => {
      state.deviceId = payload;
    },
    setTrack: (state, { payload }: PayloadAction<Track>) => {
      state.track = payload;
    },
    setTrackColor: (state, { payload }: PayloadAction<string | undefined>) => {
      state.trackColor = payload;
    },
  },
});

export const {
  setPlayer, setColor, setState, setDeviceId,
  setTrack, setTrackColor,
} = slice.actions;

export default slice.reducer;

export const selectSpotifyState = (state: RootState) => state.spotify;
