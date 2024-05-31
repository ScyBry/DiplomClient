import { Typography, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <Helmet>
        <title>{`Ошибка | Расписание`}</title>
      </Helmet>
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
