import { createBrowserRouter } from 'react-router-dom';
import { GroupPage } from '../pages/GroupPage/GroupPage';
import { MainLayout } from '../pages/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>Что-то пошло не так....</div>,
    children: [
      {
        path: 'groups/:id',
        element: <GroupPage />,
      },
    ],
  },
]);
