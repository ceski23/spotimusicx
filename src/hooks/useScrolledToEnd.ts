import { useEffect } from 'react';

export const useScrolledToEnd = (container: Element | null, callback: () => void) => {
  useEffect(() => {
    const handleScroll = (event: Event) => {
      const { currentTarget } = event as unknown as React.UIEvent<HTMLDivElement>;
      if (currentTarget.scrollHeight - currentTarget.offsetHeight - currentTarget.scrollTop < 1) {
        callback();
      }
    };

    if (container) container.addEventListener('scroll', handleScroll);

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [callback, container]);
};
