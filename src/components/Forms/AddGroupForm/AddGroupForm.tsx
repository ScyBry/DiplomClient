import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GroupSchemaType, groupSchema } from '../../../utils/zod/zod';
import styles from './addGroupForm.module.sass';
import { FormInput } from '../../Inputs/FormInput/FormInput';
import { Button } from '../../buttons/FormButton/FormButton';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { departmentApi } from '../../../services/department.service';
import { FC, useEffect, useState } from 'react';

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
  } = useForm({ resolver: zodResolver(groupSchema), mode: 'onChange' });

  const onSubmit = (data: GroupSchemaType) => {
    console.log(departmentId);
    createGroup(data);
    reset();
  };

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Введите название группы"
          label="Название группы"
          register={register('name', { required: true })}
          error={errors.name}
        />
        <div>
          <Select
            sx={{ width: '100%' }}
            {...register('departmentId', { required: true })}
            error={Boolean(errors.groupType)}
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
        <Button
          type="submit"
          variant="contained"
          text="Добавить группу"
          isValid={isValid}
        />
      </form>
    </div>
  );
};
