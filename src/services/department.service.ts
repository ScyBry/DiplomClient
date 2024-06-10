import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES, BASE_URL } from '../constants';
import { IDepartment, IGroup, ITeacher } from '../types/types';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
      providesTags: () => ['Department'],
    }),
    createDepartment: build.mutation({
      query: department => ({
        url: API_ROUTES.createDepartment,
        method: 'POST',
        body: department,
      }),
      invalidatesTags: ['Department'],
    }),

    editDepartment: build.mutation<
      void,
      { id: string; name: string; location: string }
    >({
      query: ({ id, name, location }) => ({
        url: API_ROUTES.updateDepartment,
        method: 'PATCH',
        params: {
          id,
        },
        body: {
          name,
          location,
        },
      }),
      invalidatesTags: ['Department'],
    }),

    deleteDepartment: build.mutation<void, string>({
      query: departmentId => ({
        url: API_ROUTES.deleteDepartment,
        method: 'DELETE',
        params: {
          id: departmentId,
        },
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

    editGroup: build.mutation({
      query: ({ id, name }) => ({
        url: API_ROUTES.editGroup,
        method: 'PATCH',
        params: {
          id,
        },
        body: {
          name,
        },
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
      providesTags: () => ['Group'],
    }),

    getAllTeachers: build.query<ITeacher, void[]>({
      query: () => ({
        url: API_ROUTES.getAllTeachers,
      }),
      providesTags: ['Teachers'],
    }),
  }),
});
