import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { departmentApi } from '../../../services/department.service';
import { departmentSchema, DepartmentSchemaType } from '../../../utils/zod/zod';
import { Button, TextField } from '@mui/material';

export const AddDepartmentForm = () => {
  const [createDepartment] = departmentApi.useCreateDepartmentMutation();
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
      <TextField
        fullWidth
        placeholder="Введите название отделения"
        label="Название отделения"
        {...register('name', { required: true })}
        error={!!errors?.name}
        helperText={errors.name?.message}
      />

      <Button type="submit" disabled={!isValid}>
        Добавить отделение
      </Button>
    </form>
  );
};
