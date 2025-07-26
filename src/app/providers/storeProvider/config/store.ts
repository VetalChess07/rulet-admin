import {
  combineReducers,
  configureStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';


import type { StateSchema } from '../types/stateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {

  };

  const apiReducers = {
    // [matchApi.reducerPath]: matchApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [statistApi.reducerPath]: statistApi.reducer,
    // [settingsApi.reducerPath]: settingsApi.reducer,
    // [templatesApi.reducerPath]: templatesApi.reducer,
    // [sportsApi.reducerPath]: sportsApi.reducer,
  };

  const combinedReducers = combineReducers({
    ...rootReducers,
    ...apiReducers,
  });

  const store = configureStore({
    reducer: combinedReducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['listener/setSub'],
          ignoredPaths: ['listener'],
        },
      }).concat(
        // matchApi.middleware,
        // userApi.middleware,
        // statistApi.middleware,
        // settingsApi.middleware,
        // templatesApi.middleware,
        // sportsApi.middleware,
      ),
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
