/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { State, Track } from 'features/apiTypes';

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
    setTrackColor: (state, { payload }: PayloadAction<string | undefined>) => {
      state.trackColor = payload;
    },
  },
});

export const {
  setPlayer, setColor, setState, setDeviceId,
  setTrackColor,
} = slice.actions;

export default slice.reducer;

const getSpotifyState = (state: RootState) => state.spotify;
export const selectColor = createSelector(getSpotifyState, (state) => state.color);
export const selectTrackColor = createSelector(getSpotifyState, (state) => state.trackColor);
export const selectPlayer = createSelector(getSpotifyState, (state) => state.player);
export const selectPlaybackState = createSelector(getSpotifyState, (state) => state.state);
