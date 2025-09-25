import {
  combineReducers,
  configureStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { themeReducer, themeApi } from '@/entities/themes';
import { prizeApi } from '@/entities/prizes';
import { dailyApi } from '@/entities/dailys';
import { taskApi } from '@/entities/tasks';

import type { StateSchema } from '../types/stateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    themes: themeReducer,
  };

  const apiReducers = {
    [themeApi.reducerPath]: themeApi.reducer,
    [prizeApi.reducerPath]: prizeApi.reducer,
    [dailyApi.reducerPath]: dailyApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
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
        themeApi.middleware,
        prizeApi.middleware,
        dailyApi.middleware,
        taskApi.middleware,
      ),
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
