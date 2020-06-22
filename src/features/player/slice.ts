/* eslint-disable no-param-reassign */
import {
  createSlice, combineReducers, createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { createStatusSlice, createThunk } from 'features/statusSlice';
import * as api from 'features/player/api';
import { PlayHistory } from 'features/apiTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlayerState {
  recentlyPlayed: PlayHistory[];
}

const initialState: PlayerState = {
  recentlyPlayed: [],
};

const name = 'player';
const status = createStatusSlice(name);

export const getRecentlyPlayed = createAsyncThunk<PlayHistory[], api.RecentlyPlayedParams>(
  `${name}/getRecentlyPlayed`, async (params) => (await api.fetchRecentlyPlayed(params)).items,
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecentlyPlayed.fulfilled, (state, { payload }) => {
      state.recentlyPlayed = payload;
    });
  },
});

export const transferPlayback = createThunk<void, string>(
  status,
  async (_dispatch, deviceId) => {
    await api.transferPlayback(deviceId);
  },
);

export const playUris = createThunk<void, api.PlayUrisParams>(
  status,
  async (_dispatch, params) => {
    await api.playUris(params);
  },
);

const reducer = combineReducers({
  data: slice.reducer,
  status: status.reducer,
});

export default reducer;

const getPlayerState = (state: RootState) => state.player;
export const selectRecentlyPlayed = createSelector(getPlayerState, (
  (state) => state.data.recentlyPlayed
));
