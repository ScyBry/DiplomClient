import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { departmentApi } from '../services/department.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from '../services/user.service.ts';

const rootReducer = combineReducers({
  [departmentApi.reducerPath]: departmentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(departmentApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);
