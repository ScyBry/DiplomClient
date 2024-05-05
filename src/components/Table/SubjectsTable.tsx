import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { subjectApi } from '../../services/subjects.service';
import { FC, useState } from 'react';
import { ISubject } from '../../types/types';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { teacherApi } from '../../services/teacher.service';
import { Modal } from '../Modal/Modal';
import { AddSubjectForm } from '../Forms/AddSubjectForm';

type RowProps = {
  row: ISubject;
};

const Row: FC<RowProps> = ({ row }) => {
  const [assignSubjectsToTeacher] =
    teacherApi.useAssignSubjectsToTeacherMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<string>(row.teachers[0]?.id);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTeacher = event.target.value;
    setTeacher(selectedTeacher);
  };

  const { data: teachers, isLoading } = teacherApi.useGetAllTeachersQuery();

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <TextField size="small" defaultValue={row.name} />
        </TableCell>
        <TableCell align="left">
          <TextField size="small" defaultValue={row.hoursPerGroup} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Преподаватели предмета
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      disabled={isLoading || !isEditable}
                    >
                      <InputLabel id="teachers-select-label">
                        Преподаватель
                      </InputLabel>
                      <Select
                        labelId="teachers-select-label"
                        value={teacher}
                        label="Преподаватель"
                        onChange={handleChange}
                        defaultValue={row.teachers[0]?.id}
                      >
                        {teachers?.map(teacher => (
                          <MenuItem key={teacher.id} value={teacher.id}>
                            {teacher.fullName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        Выберите преподавателя, которого хотите назначить на
                        предмет
                      </FormHelperText>
                    </FormControl>

                    <div className="flex gap-2 my-1">
                      <Button
                        onClick={() => setIsEditable(!isEditable)}
                        variant="contained"
                        size="small"
                      >
                        {isEditable ? 'отменить изменения' : 'изменить'}
                      </Button>
                      {isEditable && (
                        <Button
                          onClick={() => {
                            assignSubjectsToTeacher({
                              teacherId: teacher,
                              subjectId: row.id,
                            });
                            setIsEditable(false);
                          }}
                          size="small"
                        >
                          подтвердить изменения
                        </Button>
                      )}
                    </div>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

type SubjectTableProps = {
  id: string;
};

export const SubjectsTable: FC<SubjectTableProps> = ({ id }) => {
  const { data: subjects, isSuccess } =
    subjectApi.useGetAllGroupSubjectsQuery(id);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: '650px',

          height: '90vh',
          overflow: 'auto',
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton onClick={() => setIsAddModalOpen(true)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">Предмет</TableCell>
              <TableCell align="left">Кол-во часов</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess &&
              subjects.map(subject => <Row key={subject.name} row={subject} />)}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddSubjectForm groupId={id} />
      </Modal>
    </>
  );
};
