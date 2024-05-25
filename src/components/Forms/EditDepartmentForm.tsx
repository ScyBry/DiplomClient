import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  departmentEditSchema,
  subjectSchema,
  SubjectSchemaType,
} from '../../utils/zod/zod';
import { TextField, Typography } from '@mui/material';
import { subjectApi } from '../../services/subjects.service';

import { FC, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { IDepartment } from '../../types/types';
import { DepartmentEditSchemaType } from '../../utils/zod/zod';
import { departmentApi } from '../../services/department.service';
import { error } from 'console';

type EditDepartmentFormProps = {
  department: IDepartment;
};

export const EditDepartmentForm: FC<EditDepartmentFormProps> = ({
  department,
}) => {
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
