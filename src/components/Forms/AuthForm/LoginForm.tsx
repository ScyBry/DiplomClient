import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaType } from '../../../utils/zod/zod.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { userApi } from '../../../services/user.service.ts';
import { useState } from 'react';
import { setTokenToLocalStorage } from '../../../utils/axios/axiosBase.ts';

export const LoginForm = () => {
  const navigate = useNavigate();

  const [loginUser, { error, isSuccess, isLoading }] =
    userApi.useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<LoginSchemaType> = async userFields => {
    loginUser(userFields)
      .then(response => {
        if (response?.data?.statusCode === 200) {
          console.log(response);
          setTokenToLocalStorage(response?.data?.token);
          navigate('/');
        } else {
          setErrorMessage(
            response?.error?.data?.message || 'Ошибка регистрации',
          );
        }
      })
      .catch(error => {
        console.error('Ошибка при регистрации:', error);
        setErrorMessage('Произошла ошибка при регистрации');
      });
  };

  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <form
        className="flex flex-col gap-6 min-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4">Авторизация</Typography>

        <div className="flex flex-col gap-4">
          <TextField
            fullWidth
            label="Почта или имя пользователя"
            variant={'outlined'}
            {...register('emailOrUsername')}
            error={!!errors.emailOrUsername}
            helperText={errors.emailOrUsername?.message}
          />

          <TextField
            fullWidth
            label="Пароль"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <div className="flex gap-3 items-center">
            <Typography variant="subtitle1">Еще нет аккаунта?</Typography>
            <Link className="color" to="/register">
              <Typography variant="subtitle1" color="blue">
                Зарегистрироваться
              </Typography>
            </Link>
          </div>
          <Button
            className="max-w-28"
            type="submit"
            variant="contained"
            disabled={!isValid || isLoading}
          >
            Войти
          </Button>
        </div>

        {isSuccess && (
          <Alert
            className="absolute bottom-2 left-2"
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
          >
            Аккаунт успешно создан
          </Alert>
        )}

        {error && (
          <Alert className="absolute bottom-2 left-2" severity="error">
            {errorMessage}
          </Alert>
        )}
      </form>
    </div>
  );
};
