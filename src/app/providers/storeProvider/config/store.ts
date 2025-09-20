import {
  combineReducers,
  configureStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { themeReducer, themeApi } from '@/entities/themes';

import type { StateSchema } from '../types/stateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    themes: themeReducer,
  };

  const apiReducers = {
    [themeApi.reducerPath]: themeApi.reducer,
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
      }).concat(themeApi.middleware),
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
