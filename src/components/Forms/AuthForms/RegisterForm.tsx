import { Alert, Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerSchema, RegisterSchemaType } from '../../../utils/zod/zod.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { userApi } from '../../../services/user.service.ts';
import CheckIcon from '@mui/icons-material/Check';
import { Link, useNavigate } from 'react-router-dom';
import { setTokenToLocalStorage } from '../../../utils/axios/axiosBase.ts';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [registerUser, { isSuccess, error, data, isError, isLoading }] =
    userApi.useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async userFields => {
    await registerUser(userFields);
  };

  useEffect(() => {
    if (data) {
      const result = setTokenToLocalStorage(data.token);
      if (result) navigate('/');
    }
  }, [isSuccess, data]);

  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <form
        className="flex flex-col gap-6 min-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4">Регистрация</Typography>

        <div className="flex flex-col gap-4">
          <TextField
            fullWidth
            label="Почта"
            variant={'outlined'}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Имя пользователя"
            variant="outlined"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            fullWidth
            label="Пароль"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            label="Подтвердите пароль"
            variant="outlined"
            {...register('repeatPassword')}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />
          <div className="flex gap-3 items-center">
            <Typography variant="subtitle1">Уже есть аккаунт? </Typography>
            <Link className="color" to="/login">
              <Typography variant="subtitle1" color="blue">
                Войти
              </Typography>
            </Link>
          </div>
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            type="submit"
            variant="contained"
            disabled={!isValid}
          >
            Зарегистрироваться
          </LoadingButton>
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

        {isError && (
          <Alert className="absolute bottom-2 left-2" severity="error">
            {error.data.message}
          </Alert>
        )}
      </form>
    </div>
  );
};
