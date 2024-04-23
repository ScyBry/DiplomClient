import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../constants';
import { IDepartment, IGroup, ITeacher } from '../types/types';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api',
  }),
  tagTypes: ['Department', 'Group', 'Teachers'],
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

    getOneGroup: build.query<
      IGroup,
      { groupId: string; withSubjects: boolean }
    >({
      query: ({ groupId, withSubjects }) => ({
        url: API_ROUTES.getOneGroup,
        method: 'GET',
        params: {
          id: groupId,
          withSubjects,
        },
      }),
      providesTags: ['Group'],
    }),

    getAllTeachers: build.query<ITeacher[]>({
      query: () => ({
        url: API_ROUTES.getAllTeachers,
      }),
      providesTags: ['Teachers'],
    }),
  }),
});
