import { client, PaginatedResponse, PaginationParams } from 'api';
import { AxiosResponse } from 'axios';
import { Artist, SimplifiedAlbum, Track } from 'features/apiTypes';

export const fetchArtist = async (id: string) => client
  .get(`artists/${id}`)
  .then(({ data }: AxiosResponse<Artist>) => data);

export type ArtistAlbumsParams = PaginationParams & {
  id: string;
  country?: string;
}

export const fetchArtistAlbums = async ({ id, country }: ArtistAlbumsParams) => client
  .get(`artists/${id}/albums`, { params: { country: country || 'from_token', limit: 50 } })
  .then(({ data }: AxiosResponse<PaginatedResponse<SimplifiedAlbum>>) => data.items);

export interface TopTracksParams {
  id: string;
  country?: string;
}

export const fetchArtistTopTracks = async ({ id, country }: TopTracksParams) => client
  .get(`artists/${id}/top-tracks`, { params: { country: country || 'from_token' } })
  .then(({ data }: AxiosResponse<{tracks: Track[]}>) => data.tracks);
