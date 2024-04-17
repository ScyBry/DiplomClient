import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { departmentApi } from '../../../services/department.service';
import { groupSchema, GroupSchemaType } from '../../../utils/zod/zod';
import { FormInput } from '../../Inputs/FormInput/FormInput';
import { Button } from '../../buttons/FormButton/FormButton';
import styles from './addGroupForm.module.sass';

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

  const onSubmit: SubmitHandler<GroupSchemaType> = data => {
    createGroup(data);
    reset();
  };

  return (
    <div>
      <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Введите название группы"
          label="Название группы"
          register={register('name', { required: true })}
          error={errors.name}
          type="text"
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
