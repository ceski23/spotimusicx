/* eslint-disable no-param-reassign */
import {
  createSlice, createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Album } from 'features/apiTypes';
import * as api from './api';

export interface AlbumsState {
  currentAlbum?: Album;
  loading: boolean;
}

const initialState: AlbumsState = {
  loading: true,
};

const name = 'albums';

export const fetchAlbum = createAsyncThunk<Album, string>(
  `${name}/fetchAlbum`, async (id) => api.fetchAlbum(id),
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.currentAlbum = payload;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.loading = false;
      state.currentAlbum = undefined;
    });
  },
});

export default slice.reducer;

const getAlbumsState = (state: RootState) => state.albums;
export const selectAlbumsLoading = createSelector(getAlbumsState, (state) => state.loading);
export const selectCurrentAlbum = createSelector(getAlbumsState, (state) => state.currentAlbum);
