import {
  configureStore, Action, combineReducers, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { ThunkAction } from 'redux-thunk';
import authReducer from 'features/auth/slice';
import spotifyReducer from 'features/spotify/slice';
import libraryReducer from 'features/library/slice';
import albumsReducer from 'features/albums/slice';
import artistsReducer from 'features/artists/slice';
import playerReducer from 'features/player/slice';
import { useDispatch } from 'react-redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  library: libraryReducer,
  albums: albumsReducer,
  artists: artistsReducer,
  player: playerReducer,
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<R> = ThunkAction<R, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const useThunkDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
export const persistor = persistStore(store);
