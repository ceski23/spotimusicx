/* eslint-disable @typescript-eslint/camelcase */
import { client, PaginatedResponse, PaginationParams } from 'api';
import { AxiosResponse } from 'axios';
import { SavedTrack, SavedAlbum } from 'features/apiTypes';

export const fetchUserTracks = async (params: PaginationParams) => client
  .get('me/tracks', { params })
  .then(({ data }: AxiosResponse<PaginatedResponse<SavedTrack>>) => data);

export const fetchUserAlbums = async (params: PaginationParams) => client
  .get('me/albums', { params })
  .then(({ data }: AxiosResponse<PaginatedResponse<SavedAlbum>>) => data);
