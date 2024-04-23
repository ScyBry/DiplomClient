import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { subjectSchema, SubjectSchemaType } from '../../utils/zod/zod';
import {
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { teacherApi } from '../../services/teacher.service';
import { useState } from 'react';

export const AddSubjectForm = () => {
  const { data: teachers } = teacherApi.useGetAllTeachersQuery();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SubjectSchemaType>({
    resolver: zodResolver(subjectSchema),
    mode: 'onChange',
  });

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onSubmit: SubmitHandler<SubjectSchemaType> = data => {
    console.log(data);

    reset();
  };

  <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
    <Typography variant="h6">Добавить предмет</Typography>
    <TextField
      fullWidth
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
    <Select
      id="demo-multiple-checkbox"
      multiple
      value={personName}
      onChange={handleChange}
      input={<OutlinedInput label="Tag" />}
      renderValue={selected => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {teachers &&
        teachers.map(teacher => (
          <MenuItem
            key={teacher.createdAt}
            value={`${teacher.lastName} ${teacher.firstName} ${teacher.surname}`}
          >
            <Checkbox
              checked={
                personName.indexOf(
                  `${teacher.lastName} ${teacher.firstName} ${teacher.surname}`,
                ) > -1
              }
            />
            <ListItemText
              primary={`${teacher.lastName} ${teacher.firstName} ${teacher.surname}`}
            />
          </MenuItem>
        ))}
    </Select>
    <Button fullWidth type="submit" variant="contained" disabled={!isValid}>
      Добавить предмет
    </Button>
  </form>;
};
