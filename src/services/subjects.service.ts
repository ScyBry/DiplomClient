import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../utils/axios/axiosBase';
import { API_ROUTES } from '../constants';
import { ISubject } from '../types/types';

export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api',
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
  }),
  tagTypes: ['GroupSubjects'],
  endpoints: build => ({
    getAllGroupSubjects: build.query<ISubject[], string>({
      query: (id: string) => ({
        url: API_ROUTES.getAllGroupSubjects,
        params: {
          id,
        },
      }),
      providesTags: result => ['GroupSubjects'],
    }),
    addSubject: build.mutation({
      query: subject => ({
        url: API_ROUTES.createSubject,
        method: 'POST',
        body: subject,
      }),
      invalidatesTags: ['GroupSubjects'],
    }),
    editSubject: build.mutation<void, { id: string; subject: ISubject }>({
      query: ({ id, subject }) => ({
        url: API_ROUTES.updateSubject,
        method: 'PATCH',
        params: {
          id,
        },
        body: subject,
      }),
      invalidatesTags: ['GroupSubjects'],
    }),
    deleteSubject: build.mutation({
      query: id => ({
        url: API_ROUTES.deleteSubject,
        method: 'DELETE',
        params: {
          id,
        },
      }),
      invalidatesTags: ['GroupSubjects'],
    }),
  }),
});
