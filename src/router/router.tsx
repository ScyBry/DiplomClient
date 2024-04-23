import { createBrowserRouter } from 'react-router-dom';
import { LoginForm } from '../components/Forms/AuthForm/LoginForm.tsx';
import { RegisterForm } from '../components/Forms/AuthForm/RegisterForm.tsx';
import { GroupPage } from '../pages/GroupPage.tsx';
import { MainLayout } from '../pages/MainLayout';
import { TeachersPage } from '../pages/TeachersPage.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { SchedulePage } from '../pages/SchedulePage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>Что-то пошло не так....</div>,

    children: [
      {
        path: '/schedule',
        element: <SchedulePage />,
      },
      {
        path: '/groups/:id',
        element: <GroupPage />,
      },
      {
        path: '/teachers',
        element: <TeachersPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
]);
