import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { departmentApi } from '../services/department.service';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  [departmentApi.reducerPath]: departmentApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(departmentApi.middleware),
});

setupListeners(store.dispatch);
