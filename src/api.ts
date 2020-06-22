import axios, { AxiosError } from 'axios';
import { PaginatedSuccess } from 'features/pagination';

// TODO: Change that
export interface ApiError<T> {
  name: string;
  statusCode: number;
  data: {
    [K in keyof T]: string;
  } | string;
}

export interface PaginatedResponse<T> {
  href: string;
  items: T[];
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}

export interface CursorResponse<T> {
  href: string;
  items: T[];
  next?: string;
  cursors: Cursors;
  previous?: string;
  total: number;
}

export interface Cursors {
  after?: number;
  before?: number;
}

export interface PaginationParams {
  offset?: number;
  limit?: number;
}

export const client = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateAuthHeader = (accessToken?: string) => {
  if (accessToken) {
    client.defaults.headers.Authorization = `Bearer ${accessToken}`;
  } else delete client.defaults.headers.Authorization;
};

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      !error
      || (error.response && error.response.status === 500)
      || !error.response
    ) {
      return Promise.reject(Error('Wystąpił błąd serwera, spróbuj ponownie później'));
    }
    return Promise.reject(error);
  },
);

export function handleApiError<T>(error: object): ApiError<T> {
  const err = error as AxiosError<ApiError<T>>;
  if (err.response) return err.response.data;
  throw err;
}

export const mapResponse = <T extends object>(
  response: PaginatedResponse<T>,
): PaginatedSuccess<T> => {
  const {
    items, total, offset,
  } = response;
  return {
    items,
    totalItems: total,
    fetchedOffset: offset,
  };
};
