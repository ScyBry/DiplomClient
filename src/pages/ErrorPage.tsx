import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h1" style={{ marginBottom: 20 }}>
        Страница не найдена
      </Typography>
      <Typography variant="body1">
        К сожалению, мы не можем найти запрошенную вами страницу.
      </Typography>
      <Button variant="contained" style={{ marginTop: 20 }}>
        <Link to="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
};
