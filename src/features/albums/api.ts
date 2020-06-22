import { client } from 'api';
import { AxiosResponse } from 'axios';
import { Album } from 'features/apiTypes';

export const fetchAlbum = async (id: string) => client
  .get(`albums/${id}`)
  .then(({ data }: AxiosResponse<Album>) => data);
