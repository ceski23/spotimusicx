/* eslint-disable no-param-reassign */
import {
  createSlice, createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Artist, Track, SimplifiedAlbum } from 'features/apiTypes';
import * as api from './api';

export interface ArtistsState {
  currentArtist: {
    data?: Artist;
    loading: boolean;
  };
  artistTopTracks: {
    data?: Track[];
    loading: boolean;
  };
  artistAlbums: {
    data?: SimplifiedAlbum[];
    loading: boolean;
  };
}

const initialState: ArtistsState = {
  currentArtist: {
    loading: true,
  },
  artistTopTracks: {
    loading: true,
  },
  artistAlbums: {
    loading: true,
  },
};

const name = 'albums';

export const fetchArtist = createAsyncThunk<Artist, string>(
  `${name}/fetchArtist`, async (id) => api.fetchArtist(id),
);

export const fetchTopTracks = createAsyncThunk<Track[], string>(
  `${name}/fetchTopTracks`, async (id) => api.fetchArtistTopTracks({ id }),
);

export const fetchArtistAlbums = createAsyncThunk<SimplifiedAlbum[], string>(
  `${name}/fetchArtistAlbums`, async (id) => api.fetchArtistAlbums({ id }),
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.pending, (state) => {
      state.currentArtist.loading = true;
    });
    builder.addCase(fetchArtist.fulfilled, (state, { payload }) => {
      state.currentArtist.loading = false;
      state.currentArtist.data = payload;
    });
    builder.addCase(fetchArtist.rejected, (state) => {
      state.currentArtist.loading = false;
      state.currentArtist.data = undefined;
    });

    builder.addCase(fetchTopTracks.pending, (state) => {
      state.artistTopTracks.loading = true;
    });
    builder.addCase(fetchTopTracks.fulfilled, (state, { payload }) => {
      state.artistTopTracks.loading = false;
      state.artistTopTracks.data = payload;
    });
    builder.addCase(fetchTopTracks.rejected, (state) => {
      state.artistTopTracks.loading = false;
      state.artistTopTracks.data = undefined;
    });

    builder.addCase(fetchArtistAlbums.pending, (state) => {
      state.artistAlbums.loading = true;
    });
    builder.addCase(fetchArtistAlbums.fulfilled, (state, { payload }) => {
      state.artistAlbums.loading = false;
      state.artistAlbums.data = payload;
    });
    builder.addCase(fetchArtistAlbums.rejected, (state) => {
      state.artistAlbums.loading = false;
      state.artistAlbums.data = undefined;
    });
  },
});

export default slice.reducer;

const getArtistsState = (state: RootState) => state.artists;
export const selectArtistTopTracks = createSelector(getArtistsState, (s) => s.artistTopTracks);
export const selectArtistAlbums = createSelector(getArtistsState, (s) => s.artistAlbums);
export const selectCurrentArtist = createSelector(getArtistsState, (state) => state.currentArtist);
