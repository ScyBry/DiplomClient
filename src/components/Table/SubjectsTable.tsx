import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { subjectApi } from '../../services/subjects.service';
import { FC, useState } from 'react';
import { ISubject } from '../../types/types';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Collapse,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { teacherApi } from '../../services/teacher.service';
import { Modal } from '../Modal/Modal';
import { AddSubjectForm } from '../Forms/AddSubjectForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApproveModal } from '../Modals/ApproveModal';
import { LoadingButton } from '@mui/lab';

type RowProps = {
  row: ISubject;
  handleDeleteClick: (subjectId: string) => void;
};

const Row: FC<RowProps> = ({ row, handleDeleteClick }) => {
  const [assignSubjectsToTeacher, { isLoading, isError, isSuccess }] =
    teacherApi.useAssignSubjectsToTeacherMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<string>(row.teachers[0]?.id);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [subjectNameField, setSubjectNameField] = useState<string>('');
  const [subjectHoursField, setSubjectHoursField] = useState<number>();

  const handleNameFieldChange = event => {
    const value = event.target.value;
    setSubjectNameField(value);
  };

  const handleSubjectHoursFieldChange = event => {
    const value = Number(event.target.value);
    setSubjectHoursField(value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTeacher = event.target.value;
    setTeacher(selectedTeacher);
  };

  const handleEdit = () => {
    assignSubjectsToTeacher({
      teacherId: teacher,
      subjectId: row.id,
    });
    setIsEditable(false);
  };

  const { data: teachers } = teacherApi.useGetAllTeachersQuery();

  return (
    <>
      <TableRow
        className="hover:bg-gray-100"
        sx={{ '& > *': { borderBottom: 'unset' } }}
      >
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
          <TextField
            InputProps={{
              readOnly: !isEditable,
            }}
            multiline
            size="small"
            defaultValue={row.name}
            onChange={handleNameFieldChange}
          />
        </TableCell>
        <TableCell align="left">
          <TextField
            InputProps={{
              readOnly: !isEditable,
            }}
            size="small"
            type="number"
            defaultValue={row.hoursPerGroup}
            onChange={handleSubjectHoursFieldChange}
          />
        </TableCell>
        <TableCell align="right" className="">
          <IconButton onClick={() => setIsEditable(!isEditable)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(row.id)}>
            <DeleteIcon />
          </IconButton>
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
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="teachers-select-label">
                        Преподаватель
                      </InputLabel>
                      <Select
                        labelId="teachers-select-label"
                        value={teacher}
                        label="Преподаватель"
                        onChange={handleChange}
                        defaultValue={row.teachers[0]?.id}
                        inputProps={{
                          readOnly: isLoading || !isEditable ? true : false,
                        }}
                      >
                        <MenuItem value="">Никто</MenuItem>
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
                      <LoadingButton
                        loading={isLoading}
                        onClick={() => setIsEditable(!isEditable)}
                        variant="contained"
                        size="small"
                      >
                        {isEditable ? 'отменить изменения' : 'изменить'}
                      </LoadingButton>

                      {isEditable && (
                        <LoadingButton
                          loading={isLoading}
                          onClick={() => handleEdit()}
                          size="small"
                        >
                          подтвердить изменения
                        </LoadingButton>
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

  const [deleteSubject] = subjectApi.useDeleteSubjectMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);

  const handleDeleteClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setIsApproveModalOpen(true);
  };

  const handleDelete = () => {
    deleteSubject(selectedSubject);
    setIsApproveModalOpen(false);
  };

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
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <Typography className="p-3" variant="h5">
              Предметы
            </Typography>
            <TableRow>
              <TableCell />
              <TableCell align="left">Предмет</TableCell>
              <TableCell align="left">Кол-во часов</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setIsAddModalOpen(true)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess &&
              subjects.map(subject => (
                <Row
                  handleDeleteClick={handleDeleteClick}
                  key={subject.name}
                  row={subject}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddSubjectForm groupId={id} />
      </Modal>

      {selectedSubject && (
        <ApproveModal
          text={`Вы действительно хотите удалить предмет?`}
          handleClose={() => setIsApproveModalOpen(false)}
          isOpen={isApproveModalOpen}
          func={handleDelete}
        />
      )}
    </>
  );
};
