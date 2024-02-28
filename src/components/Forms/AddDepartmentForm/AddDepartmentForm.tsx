import { DepartmentSchemaType, departmentSchema } from '../../../utils/zod/zod';
import { FormInput } from '../../Inputs/FormInput/FormInput';
import { Button } from '../../buttons/FormButton/FormButton';
import styles from './addDepartmentForm.module.sass';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { departmentApi } from '../../../services/department.service';

export const AddDepartmentForm = () => {
  const [createDepartment, {}] = departmentApi.useCreateDepartmentMutation();
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
    <div className={styles.form_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder={'Введите название отделения'}
          label="Название отделения"
          register={register('name', { required: true })}
          error={errors.name}
        ></FormInput>

        <Button
          type="submit"
          variant="contained"
          text="Добавить отделение"
          isValid={isValid}
        ></Button>
      </form>
    </div>
  );
};
