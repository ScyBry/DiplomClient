import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { departmentApi } from '../services/department.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from '../services/user.service.ts';
import { teacherApi } from '../services/teacher.service.ts';
import { subjectApi } from '../services/subjects.service.ts';

const rootReducer = combineReducers({
  [departmentApi.reducerPath]: departmentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [teacherApi.reducerPath]: teacherApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      departmentApi.middleware,
      userApi.middleware,
      teacherApi.middleware,
      subjectApi.middleware,
    ),
});

setupListeners(store.dispatch);
