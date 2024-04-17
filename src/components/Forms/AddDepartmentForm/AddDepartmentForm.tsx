import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { departmentApi } from '../../../services/department.service';
import { departmentSchema, DepartmentSchemaType } from '../../../utils/zod/zod';
import { FormInput } from '../../Inputs/FormInput/FormInput';
import { Button } from '../../buttons/FormButton/FormButton';
import styles from './addDepartmentForm.module.sass';

export const AddDepartmentForm = () => {
  const [createDepartment] = departmentApi.useCreateDepartmentMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(departmentSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: DepartmentSchemaType) => {
    console.log(data);

    createDepartment(data);

    reset();
  };
  return (
    <div>
      <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder={'Введите название отделения'}
          label="Название отделения"
          register={register('name', { required: true })}
          error={errors.name}
          type="text"
        />

        <Button
          type="submit"
          variant="contained"
          text="Добавить отделение"
          isValid={isValid}
        />
      </form>
    </div>
  );
};
