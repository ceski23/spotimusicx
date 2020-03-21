/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from 'store';

export interface AsyncState {
  loading: boolean;
  error?: object;
}

export const initialState: AsyncState = {
  loading: false,
  error: undefined,
};

export const createStatusSlice = (prefix: string) => createSlice({
  name: prefix,
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    requestSuccess(state) {
      state.loading = false;
      state.error = undefined;
    },
    requestError(state, { payload }: PayloadAction<object>) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export function createThunk<T, U = void>(
  statusSlice: ReturnType<typeof createStatusSlice>,
  promise: (dispatch: AppDispatch, args: U) => Promise<T>,
  errorHandler?: (dispatch: AppDispatch, error: Error) => void,
) {
  return (args: U): AppThunk<Promise<T>> => async (dispatch) => {
    const { requestError, requestStart, requestSuccess } = statusSlice.actions;
    dispatch(requestStart());
    try {
      const data = await promise(dispatch, args);
      dispatch(requestSuccess());
      return data;
    } catch (err) {
      if (errorHandler) errorHandler(dispatch, err);
      dispatch(requestError(err.message));
      throw err;
    }
  };
}
