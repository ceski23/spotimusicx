/* eslint-disable no-param-reassign */
import { combineReducers, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'features/library/api';
import { createPaginatedThunk, createPaginatedReducer, PaginatedSuccess } from 'features/pagination';
import { RootState } from 'store';
import { mapResponse } from 'api';
import { SavedTrack, SavedAlbum } from 'features/apiTypes';

const name = 'me';
const SAVED_TRACKS_LIMIT = 5;
const SAVED_ALBUMS_LIMIT = 10;

export const getSavedTracks = createAsyncThunk<PaginatedSuccess<SavedTrack>, number>(
  `${name}/getSavedTracks`, async (amount) => (
    api.fetchUserTracks({ limit: SAVED_TRACKS_LIMIT, offset: amount }).then(mapResponse)
  ),
);

export const getMoreSavedTracks = createPaginatedThunk<SavedTrack>(
  `${name}/getSavedTracks`,
  async (offset) => (
    api.fetchUserTracks({ limit: SAVED_TRACKS_LIMIT, offset }).then(mapResponse)
  ),
  (state) => state.library.savedTracks,
);

const savedTracksReducer = createPaginatedReducer<SavedTrack>({
  limit: SAVED_TRACKS_LIMIT,
  types: {
    fulfilled: getMoreSavedTracks.fulfilled.type,
    pending: getMoreSavedTracks.pending.type,
    rejected: getMoreSavedTracks.rejected.type,
  },
});

export const getSavedAlbums = createAsyncThunk<PaginatedSuccess<SavedAlbum>, number>(
  `${name}/getSavedAlbums`, async (amount) => (
    api.fetchUserAlbums({ limit: SAVED_ALBUMS_LIMIT, offset: amount }).then(mapResponse)
  ),
);

export const getMoreSavedAlbums = createPaginatedThunk<SavedAlbum>(
  `${name}/getSavedAlbums`,
  async (offset) => (
    api.fetchUserAlbums({ limit: SAVED_ALBUMS_LIMIT, offset }).then(mapResponse)
  ),
  (state) => state.library.savedAlbums,
);

const savedAlbumsReducer = createPaginatedReducer<SavedAlbum>({
  limit: SAVED_ALBUMS_LIMIT,
  types: {
    fulfilled: getMoreSavedAlbums.fulfilled.type,
    pending: getMoreSavedAlbums.pending.type,
    rejected: getMoreSavedAlbums.rejected.type,
  },
});

const reducer = combineReducers({
  savedTracks: savedTracksReducer,
  savedAlbums: savedAlbumsReducer,
});

export default reducer;

const getLibraryState = (state: RootState) => state.library;
export const selectSavedTracks = createSelector(getLibraryState, (library) => library.savedTracks);
export const selectSavedAlbums = createSelector(getLibraryState, (library) => library.savedAlbums);
