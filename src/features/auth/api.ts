import { client } from 'api';
import { User } from './types';

export const fetchMe = async (): Promise<User> => client
  .get('me')
  // .catch((err) => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);
