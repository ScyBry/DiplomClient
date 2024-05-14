import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../constants.ts';
import { getTokenFromLocalStorage } from '../utils/axios/axiosBase.ts';
import { IGetProfile, ILoginUser, IRegisterUser } from '../types/types.ts';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/api',
  }),
  tagTypes: ['User', 'IsAuth'],
  endpoints: build => ({
    registerUser: build.mutation<IRegisterUser>({
      query: user => ({
        url: API_ROUTES.registerUser,
        method: 'POST',
        body: user,
      }),
      providesTags: result => ['User'],
      invalidatesTags: ['User'],
    }),
    loginUser: build.mutation<ILoginUser>({
      query: user => ({
        url: API_ROUTES.loginUser,
        method: 'POST',
        body: user,
      }),
      providesTags: result => ['User'],
      invalidatesTags: ['User', 'IsAuth'],
    }),
    getProfile: build.query<IGetProfile, IGetProfile>({
      query: () => ({
        url: API_ROUTES.getProfile,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      providesTags: result => ['IsAuth'],
    }),
  }),
});
