import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { departmentApi } from '../../services/department.service';
import { departmentSchema, DepartmentSchemaType } from '../../utils/zod/zod';
import { TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export const AddDepartmentForm = () => {
  const [createDepartment, { isLoading }] =
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
  const onSubmit = async (data: DepartmentSchemaType) => {
    createDepartment(data)
      .unwrap()
      .then(() => {
        toast.success('Отделение успешно создано');
        reset();
      })
      .catch(error => toast.error(error.data.message));
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
    </form>
  );
};
