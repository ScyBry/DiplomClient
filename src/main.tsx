import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { store } from './redux/store.ts';
import { router } from './router/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </ReduxProvider>,
);
