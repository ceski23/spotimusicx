/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { RootState } from 'store';
import { createStatusSlice } from 'features/statusSlice';
import { User } from './types';

export interface AuthState {
  accessToken?: string;
  user?: User;
}

const initialState: AuthState = {
  accessToken: undefined,
  user: undefined,
};

const name = 'auth';
const status = createStatusSlice(name);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload;
    },
    logout(state) {
      state.accessToken = undefined;
      state.user = undefined;
    },
    setUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
  },
});

const persistedAuthReducer = persistReducer({
  key: 'auth',
  storage: localforage,
}, slice.reducer);

const reducer = combineReducers({
  data: persistedAuthReducer,
  status: status.reducer,
});

export const { setAccessToken, logout, setUser } = slice.actions;
export default reducer;

export const selectAuthData = (state: RootState) => state.auth.data;
