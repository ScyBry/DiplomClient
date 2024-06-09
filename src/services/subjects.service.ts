import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../utils/axios/axiosBase';
import { API_ROUTES, BASE_URL } from '../constants';
import { ICabinet, ISubject } from '../types/types';
import { url } from 'inspector';
import { METHODS } from 'http';

export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
  }),
  tagTypes: ['GroupSubjects'],
  endpoints: build => ({
    getAllGroupSubjects: build.query<
      ISubject[],
      { id: string; includeZeroHours: boolean }
    >({
      query: ({ id, includeZeroHours }) => ({
        url: API_ROUTES.getAllGroupSubjects,
        params: {
          id,
          includeZeroHours,
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
    getAllCabinets: build.query<ICabinet[], void>({
      query: () => ({
        url: API_ROUTES.getAllCabinets,
      }),
    }),
  }),
});
