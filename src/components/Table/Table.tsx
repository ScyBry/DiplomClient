import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TABLE_HEAD_ROWS } from '../../constants.ts';
import { departmentApi } from '../../services/department.service.ts';
import { ISubject } from '../../types/types.ts';
import { SubjectSchemaType, subjectSchema } from '../../utils/zod/zod.ts';
import { Row } from './Row/Row.tsx';

type CollapsibleTableProps = {
  data: ISubject[];
};

export const CollapsibleTable: FC<CollapsibleTableProps> = ({ data }) => {
  const [updateSubject] = departmentApi.useUpdateSubjectMutation();

  const [deleteSubject] = departmentApi.useDeleteSubjectMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(subjectSchema),
  });

  const [subject, setSubject] = useState<ISubject>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => console.log(subject), [subject]);

  const handleEditClick = async (data: ISubject) => {
    setSubject(data);
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    reset();
  };

  const handleSubmitClick: SubmitHandler<SubjectSchemaType> = data => {
    const hoursPerGroupNumber = Number(data.hoursPerGroup);
    const newData = { ...data, hoursPerGroup: hoursPerGroupNumber };
    updateSubject({ id: subject?.id, data: newData });
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: '80vh' }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Редактирование</TableCell>
              {TABLE_HEAD_ROWS.map(HEAD_ROW => (
                <TableCell>{HEAD_ROW}</TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <Row
                deleteSubject={deleteSubject}
                handleEditClick={handleEditClick}
                key={row.id}
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {subject && (
        <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
          <form
            className="flex flex-col items-center justify-start gap-6 p-5 h-full min-w-96"
            onSubmit={handleSubmit(handleSubmitClick)}
          >
            <TextField
              defaultValue={subject?.name}
              fullWidth
              label="Изменить название"
              type="text"
              variant="outlined"
              multiline
              {...register('name', { required: true })}
              error={Boolean(errors.name)}
              helperText={
                errors.name
                  ? String(errors.name.message)
                  : 'Введите новое название'
              }
            />

            <TextField
              defaultValue={subject?.hoursPerGroup}
              fullWidth
              type="number"
              label="Изменить кол-во часов"
              variant="outlined"
              {...register('hoursPerGroup', {
                required: true,
              })}
              error={Boolean(errors.hours)}
              helperText={
                errors.hours
                  ? String(errors.hours.message)
                  : 'Введите количество часов'
              }
            />

            <Button
              variant="contained"
              type="submit"
              disabled={!isValid}
              sx={{ maxWidth: '200px' }}
            >
              Изменить
            </Button>
          </form>
        </Drawer>
      )}
    </>
  );
};
