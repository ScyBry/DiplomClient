import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/user.service.ts';
import { LoadingCircle } from '../components/Loading.tsx';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = userApi.useGetProfileQuery();

  if (isLoading) return <LoadingCircle />;

  if (!data || isError) navigate('/register');

  return <>{children}</>;
};
