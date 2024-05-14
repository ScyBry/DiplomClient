import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { departmentApi } from '../../services/department.service';
import { departmentSchema, DepartmentSchemaType } from '../../utils/zod/zod';
import { Button, TextField, Typography } from '@mui/material';
import { Alert } from '../Alert';

import { useEffect } from 'react';

export const AddDepartmentForm = () => {
  const [createDepartment, { isSuccess, error, isError, isLoading }] =
    departmentApi.useCreateDepartmentMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<DepartmentSchemaType>({
    resolver: zodResolver(departmentSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: DepartmentSchemaType) => {
    createDepartment(data);

    reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Добавить предмет</Typography>
      <TextField
        fullWidth
        placeholder="Введите название отделения"
        label="Название отделения"
        {...register('name', { required: true })}
        error={!!errors?.name}
        helperText={errors.name?.message}
      />

      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        disabled={!isValid}
        loadingPosition="start"
      >
        Добавить отделение
      </LoadingButton>

      {isSuccess && (
        <Alert severity="success">Отделение успешно добавлено</Alert>
      )}
      {isError && <Alert severity="error">{error?.data?.message}</Alert>}
    </form>
  );
};
