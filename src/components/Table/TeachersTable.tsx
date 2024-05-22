import {
  Alert,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { TEACHER_TABLE_HEAD_ROWS } from '../../constants';
import { FC, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { ITeacher } from '../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApproveModal } from '../Modals/ApproveModal';
import { teacherApi } from '../../services/teacher.service';
import { toast } from 'react-toastify';

type TeachersTableProps = {
  teachers: ITeacher[];
  setIsTeacherModalOpen: (isTeacherModalOpen: boolean) => void;
};

export const TeachersTable: FC<TeachersTableProps> = ({
  teachers,
  setIsTeacherModalOpen,
}) => {
  const [deleteTeacher, { isSuccess, isError, error }] =
    teacherApi.useDeleteTeacherMutation();
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher>();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);

  const handleDeleteClick = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setIsApproveModalOpen(true);
  };

  const handleDelete = () => {
    deleteTeacher(selectedTeacher?.id);
    setIsApproveModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Преподаватель успешно удален');
    }

    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error]);

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
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <Typography className="p-3" variant="h5">
              Преподаватели
            </Typography>
            <TableRow>
              {TEACHER_TABLE_HEAD_ROWS.map(row => (
                <TableCell key={row} align="left">
                  {row}
                </TableCell>
              ))}
              <TableCell align="right">
                <IconButton onClick={() => setIsTeacherModalOpen(true)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map(teacher => (
              <TableRow key={teacher.createdAt} className="hover:bg-gray-100">
                <TableCell align="left">
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={teacher.firstName}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextField defaultValue={teacher.lastName} />
                </TableCell>
                <TableCell align="left">
                  <TextField defaultValue={teacher.surname} />
                </TableCell>
                <TableCell align="left">
                  <TextField type="number" defaultValue={teacher.totalHours} />
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(teacher)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedTeacher && (
        <ApproveModal
          text={`Вы действительно хотите удалить преподавателя ${selectedTeacher.lastName} ${selectedTeacher.firstName} ${selectedTeacher.surname}?`}
          handleClose={() => setIsApproveModalOpen(false)}
          isOpen={isApproveModalOpen}
          func={handleDelete}
        />
      )}
    </>
  );
};
