import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { groupEditSchema, GroupEditSchemaType } from '../../utils/zod/zod';
import { TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { IGroup } from '../../types/types';
import { departmentApi } from '../../services/department.service';

type EditGroupFormProps = {
  group: IGroup;
};

export const EditGroupForm: FC<EditGroupFormProps> = ({ group }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GroupEditSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(groupEditSchema),
  });

  const [editGroup, { isLoading }] = departmentApi.useEditGroupMutation();

  const onSubmit: SubmitHandler<GroupEditSchemaType> = data => {
    editGroup({
      id: group.id,
      name: data.name,
    })
      .unwrap()
      .then(() => toast.success('Название группы успешно изменено'))
      .catch(error => toast.error(error.data.message));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Редактировать группу</Typography>
      <TextField
        fullWidth
        multiline
        label="Название группы"
        placeholder="Введите название группы"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        defaultValue={group.name}
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
