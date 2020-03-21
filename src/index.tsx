import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import globalStyles from 'globalStyles';
import { Provider } from 'react-redux';
import store, { persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { App } from './App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Global styles={globalStyles} />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
