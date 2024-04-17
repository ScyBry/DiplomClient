import { zodResolver } from '@hookform/resolvers/zod';
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { departmentApi } from '../../../services/department.service';
import { subjectSchema, SubjectSchemaType } from '../../../utils/zod/zod';
import { FormInput } from '../../Inputs/FormInput/FormInput';
import { Button } from '../../buttons/FormButton/FormButton';
import styles from './AddSubjectForm.module.sass';

export const AddSubjectForm = () => {
  const { data } = departmentApi.useGetAllTeachersQuery({});

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(subjectSchema), mode: 'onChange' });

  const onSubmit = async (data: SubjectSchemaType) => {
    reset();
  };

  const [teachers, setTeachers] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof teachers>) => {
    const {
      target: { value },
    } = event;

    setTeachers(value as string[]);
  };

  return (
    <div>
      <form
        className={styles.form_wrapper}
        style={{ minWidth: '400px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          placeholder="Введите название предмета"
          label="Навзание предмета"
          register={register('name', { required: true })}
          error={errors.name}
          type="text"
        />
        <FormInput
          placeholder="Введите количество часов на предмет"
          label="Количество часов на предмет"
          register={register('hours', { required: true, valueAsNumber: true })}
          error={errors.hours}
          type="number"
        />
        <Select
          sx={{ width: '100%' }}
          {...register('teacherId', { required: true })}
          error={Boolean(errors.teacherId)}
          multiple
          value={teachers}
          renderValue={selected => selected.join(', ')}
          onChange={handleChange}
        >
          {data &&
            data.map(teacher => (
              <MenuItem key={teacher.id} value={teacher.id}>
                <Checkbox checked={teachers.indexOf(teacher.id) > -1} />
                <ListItemText
                  primary={`${teacher.firstName} ${teacher.lastName} ${teacher.surname}`}
                />
              </MenuItem>
            ))}
        </Select>

        <Button
          type="submit"
          variant="contained"
          text="Добавить предмет"
          isValid={isValid}
        />
      </form>
    </div>
  );
};
