// External Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
// Internal Dependencies
import rootReducer from './rootReducer';

/**
 * The store creates a persisted store that can be used by a redux
 * provider to provide the state in the root reducer to any components
 * nested within the provider
 */

/**
 * persistConfig is a config object used for redux-persist that
 * sets the key to root,
 * stateReconciler set to autoMergeLevel2 sets the merge to use shallow equality
 */

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

// Creates a persistedReducer to create the store with

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creates a standard redux store using the persistedReducer

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);

/**
 * persistedStore is used by PersistGate to prevent the loading
 * of the app until the persistStore has been retrieved and saved
 * to Redux
 */

export const persistedStore = persistStore(store);
