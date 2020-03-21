/* eslint-disable @typescript-eslint/camelcase */
import { client } from 'api';

export const transferPlayback = async (deviceId: string): Promise<void> => client
  .put('me/player', { device_ids: [deviceId] })
  // .catch((err) => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);
