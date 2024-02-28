import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../constants';
import { IDepartment } from '../types/types';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api',
  }),
  tagTypes: ['Department', 'Group'],
  endpoints: build => ({
    getAllDepartments: build.query<IDepartment[], boolean>({
      query: (withGroups: boolean) => ({
        url: API_ROUTES.getAllDepartments,
        params: {
          withGroups,
        },
      }),
      providesTags: result => ['Department'],
    }),
    createDepartment: build.mutation({
      query: department => ({
        url: API_ROUTES.createDepartment,
        method: 'POST',
        body: department,
      }),
      invalidatesTags: ['Department'],
    }),
    createGroup: build.mutation({
      query: group => ({
        url: API_ROUTES.createGroup,
        method: 'POST',
        body: group,
      }),
      invalidatesTags: ['Group', 'Department'],
    }),
    deleteGroup: build.mutation({
      query: groupId => ({
        url: API_ROUTES.deleteGroup,
        params: {
          id: groupId,
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['Department', 'Group'],
    }),
    getOneGroup: build.mutation({
      query: ({ groupId, withSubjects }) => ({
        url: API_ROUTES.getOneGroup,
        params: {
          id: groupId,
          withSubjects,
        },
        method: 'GET',
      }),
    }),
  }),
});
