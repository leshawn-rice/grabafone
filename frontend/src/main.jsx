// External Dependencies
import React from 'react';
import { createRoot } from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// Internal Dependencies
import { store, persistedStore } from './redux/store';
// Components
import Router from './router';
// Styles
import './styles/index.scss';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
