import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDepartment } from '../types/types';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api/department',
  }),
  tagTypes: ['Department'],
  endpoints: build => ({
    getAllDepartments: build.query<IDepartment[], boolean>({
      query: (withGroups: boolean) => ({
        url: 'getAllDepartments',
        params: {
          withGroups,
        },
      }),
      providesTags: result => ['Department'],
    }),
  }),
});
