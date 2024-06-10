import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES, BASE_URL } from '../constants.ts';
import { getTokenFromLocalStorage } from '../utils/axios/axiosBase.ts';
import {
  IGetProfile,
  ILoginUser,
  IRegisterUser,
  IUser,
} from '../types/types.ts';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['User', 'IsAuth', 'Users'],
  endpoints: build => ({
    findAll: build.query<IUser[], void>({
      query: () => ({
        url: API_ROUTES.getAllUsers,
      }),
      providesTags: () => ['Users'],
    }),

    registerUser: build.mutation<void, IRegisterUser>({
      query: user => ({
        url: API_ROUTES.registerUser,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    loginUser: build.mutation<void, ILoginUser>({
      query: user => ({
        url: API_ROUTES.loginUser,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User', 'IsAuth'],
    }),
    getProfile: build.query<IGetProfile, void>({
      query: () => ({
        url: API_ROUTES.getProfile,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      providesTags: () => ['IsAuth'],
    }),

    updateUser: build.mutation({
      query: ({ id, user }) => ({
        url: API_ROUTES.updateUser,
        method: 'PATCH',
        params: {
          id,
        },
        body: { ...user },
      }),
      invalidatesTags: ['Users'],
    }),

    deleteUser: build.mutation({
      query: id => ({
        url: API_ROUTES.deleteUser,
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});
