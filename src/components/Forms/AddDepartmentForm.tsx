import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { departmentApi } from '../../services/department.service';
import { departmentSchema, DepartmentSchemaType } from '../../utils/zod/zod';
import {
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const AddDepartmentForm = () => {
  const [createDepartment, { isLoading }] =
    departmentApi.useCreateDepartmentMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<DepartmentSchemaType>({
    resolver: zodResolver(departmentSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: DepartmentSchemaType) => {
    createDepartment({ ...data, location: value })
      .unwrap()
      .then(() => {
        toast.success('Отделение успешно создано');
        reset();
      })
      .catch(error => toast.error(error.data.message));
  };

  const [value, setValue] = useState('ГЛВ');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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

      <FormControl component="fieldset">
        <FormLabel component="legend">Выберите корпус</FormLabel>
        <RadioGroup
          row
          aria-label="building"
          onChange={handleChange}
          value={value}
        >
          <FormControlLabel
            value="ГЛВ"
            control={<Radio />}
            label="Главный корпус"
          />
          <FormControlLabel value="УПК" control={<Radio />} label="Учебный" />
        </RadioGroup>
      </FormControl>

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
