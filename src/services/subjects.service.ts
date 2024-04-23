import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../utils/axios/axiosBase';
import { API_ROUTES } from '../constants';

export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api',
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
  }),
  tagTypes: ['GroupSubjects'],
  endpoints: build => ({
    getAllGroupSubjects: build.query({
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
    }),
  }),
});
