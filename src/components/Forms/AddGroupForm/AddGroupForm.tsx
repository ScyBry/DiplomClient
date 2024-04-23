import { zodResolver } from '@hookform/resolvers/zod';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { departmentApi } from '../../../services/department.service';
import { groupSchema, GroupSchemaType } from '../../../utils/zod/zod';

type AddGroupFormProps = {
  departmentId: string;
};

export const AddGroupForm: FC<AddGroupFormProps> = ({ departmentId }) => {
  const { data } = departmentApi.useGetAllDepartmentsQuery(false);
  const [createGroup] = departmentApi.useCreateGroupMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<GroupSchemaType>({
    resolver: zodResolver(groupSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<GroupSchemaType> = data => {
    createGroup(data);
    reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Добавить новую группу</Typography>
      <TextField
        {...register('name', { required: true })}
        label="Название группы"
        placeholder="Введите название группы"
        error={!!errors.name}
        helperText={errors?.name?.message}
      />
      <div>
        <Select
          sx={{ width: '100%' }}
          {...register('departmentId', { required: true })}
          error={Boolean(errors.departmentId)}
          defaultValue={departmentId}
        >
          {data &&
            data.map(department => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
        </Select>
      </div>
      <Button variant="contained" disabled={!isValid} type="submit">
        Добавить группу
      </Button>
    </form>
  );
};
