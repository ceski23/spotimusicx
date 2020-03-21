import { css } from '@emotion/core';

export default css`
  body {
    margin: 0;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;