/* eslint-disable no-param-reassign */
import {
  createReducer, PayloadAction, Draft, AsyncThunkPayloadCreator, createAsyncThunk,
} from '@reduxjs/toolkit';

interface PaginateConfig {
  limit: number;
  types: {
    pending: string;
    fulfilled: string;
    rejected: string;
  };
}

export interface Paginated<T> {
  fetching: boolean;
  error: boolean;
  limit: number;
  items: T[] | null;
  totalItems: number | null;
  offset: number | null;
}

export interface PaginatedSuccess<T> {
  items: T[];
  totalItems: number;
  fetchedOffset: number;
}

interface ThunkApi<S> {
  dispatch: any;
  state: S;
  extra: any;
  rejectValue: Error;
}

export const getDefaultPaginatedState = <T extends object>(limit: number): Paginated<T> => ({
  fetching: false,
  error: false,
  limit,
  totalItems: null,
  items: null,
  offset: null,
});

export const createPaginatedReducer = <T extends object>({ limit, types }: PaginateConfig) => (
  createReducer(getDefaultPaginatedState<T>(limit), (builder) => {
    builder.addCase(types.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(types.fulfilled, (state, { payload }: PayloadAction<PaginatedSuccess<T>>) => {
      state.fetching = false;
      state.error = false;
      state.items = (state.items || []).concat(payload.items as Draft<T>[]);
      state.totalItems = payload.totalItems;
      state.offset = payload.fetchedOffset;
    });
    builder.addCase(types.rejected, (state) => {
      state.fetching = false;
      state.error = true;
    });
  })
);


export const createPaginatedThunk = <R, S = any>(
  type: string,
  payloadCreator: AsyncThunkPayloadCreator<PaginatedSuccess<R>, number, ThunkApi<S>>,
  getPaginatedState: (state: S) => Paginated<R>,
) => (
    createAsyncThunk<PaginatedSuccess<R>, void, ThunkApi<S>>(type, async (_arg, thunkApi) => {
      const {
        limit, offset, totalItems, items,
      } = getPaginatedState(thunkApi.getState());
      const nextOffset = offset == null ? 0 : offset + limit;

      if (items && items.length === totalItems) {
        const noMoreResponse: PaginatedSuccess<R> = {
          fetchedOffset: offset || 0,
          items: [],
          totalItems,
        };
        return noMoreResponse;
      }

      return payloadCreator(nextOffset, thunkApi);
    })
  );
