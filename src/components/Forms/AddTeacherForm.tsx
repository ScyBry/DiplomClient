import { TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addTeacherSchema, AddTeacherSchemaType } from '../../utils/zod/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { teacherApi } from '../../services/teacher.service';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

export const AddTeacherForm = () => {
  const [createTeacher, { isLoading }] = teacherApi.useCreateTeacherMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddTeacherSchemaType>({
    resolver: zodResolver(addTeacherSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<AddTeacherSchemaType> = data => {
    const { totalHours, ...rest } = data;
    // @ts-ignore
    createTeacher({ ...rest, totalHours: Number(totalHours) })
      .then(() => {
        toast.success('Преподаватель успешно добавлен');
        reset();
      })
      .catch(error => toast.error(error.data.message));
    reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Добавить преподавателя</Typography>
      <TextField
        fullWidth
        label="Фамилия"
        placeholder="Введите фамилию"
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        fullWidth
        label="Имя"
        placeholder="Введите имя"
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        fullWidth
        label="Отчество"
        placeholder="Введите отчество"
        {...register('surname')}
        error={!!errors.surname}
        helperText={errors.surname?.message}
      />
      <TextField
        fullWidth
        type="number"
        label="Кол-во часов"
        placeholder="Введите кол-во часов"
        {...register('totalHours')}
        error={!!errors.totalHours}
        helperText={errors.totalHours?.message}
      />
      <LoadingButton
        loading={isLoading}
        loadingPosition="start"
        fullWidth
        type="submit"
        variant="contained"
        disabled={!isValid}
      >
        Добавить преподавателя
      </LoadingButton>
    </form>
  );
};
