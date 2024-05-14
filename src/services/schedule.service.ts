import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../utils/axios/axiosBase';
import { API_ROUTES } from '../constants';
import { IScheduleData } from '../types/types';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api',
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
  }),
  tagTypes: ['GroupSchedule'],
  endpoints: build => ({
    getGroupSchedule: build.query<IScheduleData[], string>({
      query: groupId => ({
        url: API_ROUTES.getGroupSchedule,
        method: 'GET',
        params: {
          id: groupId,
        },
      }),
      providesTags: result => ['GroupSchedule'],
    }),
    saveDaySchedule: build.mutation({
      query: body => ({
        url: API_ROUTES.saveDaySchedule,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GroupSchedule'],
    }),
  }),
});
