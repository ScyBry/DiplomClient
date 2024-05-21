import { createBrowserRouter } from 'react-router-dom';
import { GroupPage } from '../pages/GroupPage.tsx';
import { MainLayout } from '../pages/MainLayout';
import { TeachersPage } from '../pages/TeachersPage.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { RegisterForm } from '../components/Forms/AuthForms/RegisterForm.tsx';
import { LoginForm } from '../components/Forms/AuthForms/LoginForm.tsx';
import { GroupSchedulePage } from '../pages/GroupSchedulePage.tsx';
import { ErrorPage } from '../pages/ErrorPage.tsx';
import { MainPage } from '../pages/MainPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },

      {
        path: '/groups/:id',
        element: <GroupPage />,
      },
      {
        path: '/teachers',
        element: <TeachersPage />,
      },
      {
        path: 'groupSchedule/:id',
        element: <GroupSchedulePage />,
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
