import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaType } from '../../../utils/zod/zod.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../../services/user.service.ts';
import { useEffect } from 'react';
import { setTokenToLocalStorage } from '../../../utils/axios/axiosBase.ts';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

export const LoginForm = () => {
  const navigate = useNavigate();

  const [loginUser, { error, data, isSuccess, isLoading, isError }] =
    userApi.useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async userFields => {
    loginUser(userFields)
      .unwrap()
      .then(response => {
        // @ts-ignore
        toast.success(response.data.message);
      })
      .catch(error => toast.error(error.data.message));
  };

  useEffect(() => {
    // @ts-ignore
    if (data && data.token) {
      // @ts-ignore
      const result = setTokenToLocalStorage(data.token);

      if (result) navigate('/');
    }
  }, [isSuccess, data, error, isError]);

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
            type="password"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            className="max-w-28"
            type="submit"
            variant="contained"
            disabled={!isValid}
          >
            Войти
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};
