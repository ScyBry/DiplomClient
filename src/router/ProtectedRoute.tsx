import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/user.service.ts';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { data, isLoading } = userApi.useGetProfileQuery();

  useEffect(() => {
    if (!isLoading && !data) {
      console.log(data);

      navigate('/register');
    }
  }, [isLoading, data, navigate]);

  return <>{children}</>;
};
