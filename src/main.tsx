import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { store } from './redux/store.ts';
import { router } from './router/router.tsx';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ReduxProvider>
  </ThemeProvider>,
);
