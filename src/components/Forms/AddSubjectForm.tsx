import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { subjectSchema, SubjectSchemaType } from '../../utils/zod/zod';
import { TextField, Typography } from '@mui/material';
import { subjectApi } from '../../services/subjects.service';

import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

type AddSubjectFormProps = {
  groupId: string;
};

export const AddSubjectForm: FC<AddSubjectFormProps> = ({ groupId }) => {
  const [createSubject, { isLoading }] = subjectApi.useAddSubjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SubjectSchemaType>({
    resolver: zodResolver(subjectSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SubjectSchemaType> = data => {
    const { hoursPerGroup, ...elseData } = data;

    const subjectData = {
      ...elseData,
      hoursPerGroup: Number(hoursPerGroup),
      groupId,
    };

    createSubject(subjectData)
      .then(() => toast.success('Предмет успешно добавлен'))
      .catch(error => toast.error(error.data.message));
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Добавить предмет</Typography>
        <TextField
          fullWidth
          multiline
          label="Название предмета"
          placeholder="Введите название предмета"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Кол-во часов"
          placeholder="Введите кол-во часов"
          {...register('hoursPerGroup')}
          error={!!errors.hoursPerGroup}
          helperText={errors.hoursPerGroup?.message}
        />

        <LoadingButton
          loading={isLoading}
          loadingPosition="start"
          fullWidth
          type="submit"
          variant="contained"
          disabled={!isValid}
        >
          Добавить предмет
        </LoadingButton>
      </form>
    </>
  );
};
