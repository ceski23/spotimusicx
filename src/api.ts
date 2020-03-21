import axios, { AxiosError } from 'axios';

// TODO: Change that
export interface ApiError<T> {
  name: string;
  statusCode: number;
  data: {
    [K in keyof T]: string;
  } | string;
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
