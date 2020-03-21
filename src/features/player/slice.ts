/* eslint-disable no-param-reassign */
import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { createStatusSlice, createThunk } from 'features/statusSlice';
import * as api from 'features/player/api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlayerState {
}

const initialState: PlayerState = {
};

const name = 'player';
const status = createStatusSlice(name);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    // setAccessToken(state, { payload }: PayloadAction<string>) {
    //   state.accessToken = payload;
    // },
  },
});

export const transferPlayback = createThunk<void, string>(
  status,
  async (_dispatch, deviceId) => {
    await api.transferPlayback(deviceId);
  },
);

const reducer = combineReducers({
  data: slice.reducer,
  status: status.reducer,
});

// export const { } = slice.actions;
export default reducer;

export const selectAuthData = (state: RootState) => state.auth.data;
