import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { store } from './redux/store.ts';
import { router } from './router/router.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: green[700],
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </ReduxProvider>
    </HelmetProvider>
  </ThemeProvider>,
);
