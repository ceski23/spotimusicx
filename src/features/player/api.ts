/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import { client, CursorResponse } from 'api';
import { PlayHistory } from 'features/apiTypes';

export const transferPlayback = async (deviceId: string): Promise<void> => client
  .put('me/player', { device_ids: [deviceId] })
  // .catch((err) => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);

export interface PlayUrisParams {
  deviceId?: string;
  context_uri?: string;
  uris?: string[];
  offset?: { position: number; uri: never } | { position: never; uri: string };
  position_ms?: number;
}

export const playUris = async ({ deviceId, ...body }: PlayUrisParams) => client
  .put<void>('me/player/play', body, { params: { device_id: deviceId } })
  .then(({ data }) => data);

export interface RecentlyPlayedParams {
  limit?: number;
  after?: number;
  before?: number;
}

export const fetchRecentlyPlayed = async (params: RecentlyPlayedParams) => client
  .get<CursorResponse<PlayHistory>>('me/player/recently-played', { params })
  .then(({ data }) => data);
