import { format, parse } from 'date-fns';

export const useDateFormatter = () => {
  const formatTime = (timestamp: number) => format(parse(timestamp.toString(), 'T', new Date()), 'mm:ss');

  return { formatTime };
};
