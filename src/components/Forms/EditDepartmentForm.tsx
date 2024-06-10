import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  departmentEditSchema,
  DepartmentEditSchemaType,
} from '../../utils/zod/zod';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { FC, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { IDepartment } from '../../types/types';
import { departmentApi } from '../../services/department.service';

type EditDepartmentFormProps = {
  department: IDepartment;
};

export const EditDepartmentForm: FC<EditDepartmentFormProps> = ({
  department,
}) => {
  const [location, setLocation] = useState(department.location);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocation(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DepartmentEditSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(departmentEditSchema),
  });

  const [editDepartment, { isLoading }] =
    departmentApi.useEditDepartmentMutation();

  const onSubmit: SubmitHandler<DepartmentEditSchemaType> = data => {
    editDepartment({
      id: department.id,
      name: data.name,
      location: location,
    })
      .unwrap()
      .then(() => toast.success('Название отделения успешно изменено'))
      .catch(error => toast.error(error.data.message));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Редактировать отделение</Typography>
      <TextField
        fullWidth
        multiline
        label="Название отделения"
        placeholder="Введите название отделения"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        defaultValue={department.name}
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">Выберите корпус</FormLabel>
        <RadioGroup
          row
          aria-label="building"
          onChange={handleChange}
          value={location}
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
        loadingPosition="start"
        fullWidth
        type="submit"
        variant="contained"
        disabled={!isValid}
      >
        Редактировать
      </LoadingButton>
    </form>
  );
};
