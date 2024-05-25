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
  Tooltip,
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
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';

type TeachersTableProps = {
  teachers: ITeacher[];
  setIsTeacherModalOpen: (isTeacherModalOpen: boolean) => void;
};

export const TeachersTable: FC<TeachersTableProps> = ({
  teachers,
  setIsTeacherModalOpen,
}) => {
  const { register, getValues } = useForm({ mode: 'onChange' });

  const [deleteTeacher] = teacherApi.useDeleteTeacherMutation();
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher>();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleDeleteClick = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setIsApproveModalOpen(true);
  };

  const handleDelete = () => {
    deleteTeacher(selectedTeacher?.id)
      .unwrap()
      .then(() => toast.success('Преподаватель успешно удален'))
      .catch(error => toast.error(error.data.message));
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
                <Tooltip title="Добавить преподавателя">
                  <IconButton onClick={() => setIsTeacherModalOpen(true)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map(teacher => (
              <TableRow key={teacher.createdAt} className="hover:bg-gray-100">
                <TableCell align="left">
                  <TextField
                    inputProps={{
                      readOnly: !isEditable,
                    }}
                    defaultValue={teacher.firstName}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextField
                    inputProps={{
                      readOnly: !isEditable,
                    }}
                    defaultValue={teacher.lastName}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextField
                    inputProps={{
                      readOnly: !isEditable,
                    }}
                    defaultValue={teacher.surname}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextField
                    inputProps={{
                      readOnly: !isEditable,
                    }}
                    type="number"
                    defaultValue={teacher.totalHours}
                  />
                </TableCell>
                <TableCell align="right">
                  {isEditable ? (
                    <Tooltip title="Подтвердить изменения">
                      <IconButton>
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Редактировать данные преподавателя">
                      <IconButton onClick={() => setIsEditable(!isEditable)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title="Удалить преподавателя">
                    <IconButton onClick={() => handleDeleteClick(teacher)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
