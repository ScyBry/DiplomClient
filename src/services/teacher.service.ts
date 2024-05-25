import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../constants';
import { ITeacher } from '../types/types';

export const teacherApi = createApi({
  reducerPath: 'teacherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api',
  }),
  tagTypes: ['Teachers'],
  endpoints: build => ({
    getAllTeachers: build.query<ITeacher[]>({
      query: () => ({
        url: API_ROUTES.getAllTeachers,
        method: 'GET',
      }),
      providesTags: result => ['Teachers'],
    }),
    createTeacher: build.mutation<Partial<ITeacher>, ITeacher>({
      query: teacher => ({
        url: API_ROUTES.createTeacher,
        method: 'POST',
        body: teacher,
      }),
      invalidatesTags: ['Teachers'],
    }),
    deleteTeacher: build.mutation({
      query: teacherId => ({
        url: API_ROUTES.deleteTeacher,
        method: 'DELETE',
        params: {
          teacherId,
        },
      }),
      invalidatesTags: ['Teachers'],
    }),

    assignSubjectsToTeacher: build.mutation<
      void,
      { subjectId: string; teachers: ITeacher[] }
    >({
      query: ({ subjectId, teachers }) => ({
        url: API_ROUTES.assignSubjectsToTeacher,
        method: 'POST',
        params: {
          subjectId,
        },
        body: {
          teachers,
        },
      }),
    }),
  }),
});
