import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../utils/axios/axiosBase';
import { API_ROUTES, BASE_URL } from '../constants';
import { IScheduleData } from '../types/types';
import { teacherApi } from './teacher.service';
import { subjectApi } from './subjects.service';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
  }),
  tagTypes: ['GroupSchedule', 'Cabinets'],
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

    confirmSchedule: build.mutation({
      query: id => ({
        url: API_ROUTES.confirmSchedule,
        method: 'POST',
        params: {
          id,
        },
      }),
      invalidatesTags: ['GroupSchedule'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(teacherApi.util.invalidateTags(['Teachers']));
        dispatch(subjectApi.util.invalidateTags(['GroupSubjects']));
      },
    }),

    findAvailableCabinets: build.mutation({
      query: ({ day, orderNumber, location }) => ({
        url: API_ROUTES.findAvailableCabinets,
        method: 'GET',
        params: {
          day,
          location,
          orderNumber,
        },
      }),
    }),
  }),
});
