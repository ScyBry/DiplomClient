import { TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerSchema, RegisterSchemaType } from '../../../utils/zod/zod.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { userApi } from '../../../services/user.service.ts';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
  const [registerUser, { isLoading }] = userApi.useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async userFields => {
    registerUser(userFields)
      .then(() => toast.success('Аккаунт успешно зарегистрирован'))
      .catch(error => toast.error(error.data.message));
  };

  return (
    <form className="flex flex-col gap-6 " onSubmit={handleSubmit(onSubmit)}>
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
          type="password"
          label="Пароль"
          variant="outlined"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          fullWidth
          type="password"
          label="Подтвердите пароль"
          variant="outlined"
          {...register('repeatPassword')}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
        />
        <LoadingButton
          loading={isLoading}
          loadingPosition="start"
          type="submit"
          variant="contained"
          disabled={!isValid}
        >
          Зарегистрировать
        </LoadingButton>
      </div>
    </form>
  );
};
