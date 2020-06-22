import { keyframes } from '@emotion/core';

export const theme = {
  colors: {
    primary: '#01d743',
    text: '#444446',
  },
  sizes: {
    playerHeight: '100px',
  },
};

export type Theme = typeof theme;

export const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0.2;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideRight = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0.2;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0.2;
  }

  to {
    opacity: 1;
  }
`;
