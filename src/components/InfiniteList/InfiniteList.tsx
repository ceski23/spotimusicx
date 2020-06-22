import React, { FC, ReactElement } from 'react';
import { useScrolledToEnd } from 'hooks/useScrolledToEnd';
import { useDebouncedCallback } from 'use-debounce';
import { Loading } from 'components/Loading';

interface Props {
  isLoading: boolean;
  fetchNext: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  debounce?: number;
}

export const InfiniteList: FC<Props> = ({
  isLoading, fetchNext, scrollRef, children, debounce = 500, ...props
}): ReactElement => {
  const container = scrollRef.current;
  const [debouncedFetch] = useDebouncedCallback(fetchNext, debounce, {
    leading: true,
  });

  useScrolledToEnd(container, () => {
    if (!isLoading) debouncedFetch();
  });

  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...props}>
      {children}
      {isLoading && <Loading />}
    </div>
  );
};
