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

type TeachersTableProps = {
  teachers: ITeacher[];
  setIsTeacherModalOpen: (isTeacherModalOpen: boolean) => void;
};

export const TeachersTable: FC<TeachersTableProps> = ({
  teachers,
  setIsTeacherModalOpen,
}) => {
  const [deleteTeacher] = teacherApi.useDeleteTeacherMutation();
  const [updateTeacher] = teacherApi.useUpdateTeacherMutation();
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleDeleteClick = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setIsApproveModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedTeacher) {
      deleteTeacher(selectedTeacher.id)
        .unwrap()
        .then(() => toast.success('Преподаватель успешно удален'))
        .catch(error => toast.error(error.data.message));
      setIsApproveModalOpen(false);
    }
  };

  const handleSaveClick = (teacher: ITeacher, data: Partial<ITeacher>) => {
    if (data.totalHours) {
      data.totalHours = Number(data.totalHours);
    }

    updateTeacher({ id: teacher.id, teacher: { ...data } })
      .unwrap()
      .then(() => toast.success('Данные преподавателя успешно обновлены'))
      .catch(error => toast.error(error.data.message));
  };

  const filteredTeachers = teachers.filter(teacher => {
    const fullName = `${teacher.lastName} ${teacher.firstName} ${teacher.surname}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: '650px',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <div className="p-3">
              <Typography className="p-3" variant="h5">
                Преподаватели
              </Typography>
              <TextField
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск по имени"
              />
            </div>
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

          {filteredTeachers.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              <Typography variant="h4">Ничего не найдено</Typography>
            </div>
          ) : (
            filteredTeachers.map(teacher => (
              <TableBody>
                <TeachersTableRow
                  key={teacher.id}
                  teacher={teacher}
                  handleDeleteClick={handleDeleteClick}
                  handleSaveClick={handleSaveClick}
                />
              </TableBody>
            ))
          )}
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

type TeachersTableRowProps = {
  teacher: ITeacher;
  handleDeleteClick: (teacher: ITeacher) => void;
  handleSaveClick: (teacher: ITeacher, data: Partial<ITeacher>) => void;
};

const TeachersTableRow: FC<TeachersTableRowProps> = ({
  teacher,
  handleDeleteClick,
  handleSaveClick,
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editedTeacher, setEditedTeacher] = useState<Partial<ITeacher>>({});

  const handleEditChange =
    (field: keyof ITeacher) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTeacher(prev => ({ ...prev, [field]: event.target.value }));
    };

  const handleSave = () => {
    handleSaveClick(teacher, editedTeacher);
    setIsEditable(false);
  };

  return (
    <TableRow key={teacher.id} className="hover:bg-gray-100">
      <TableCell align="left">
        <TextField
          inputProps={{
            readOnly: !isEditable,
          }}
          defaultValue={teacher.lastName}
          onChange={handleEditChange('lastName')}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          inputProps={{
            readOnly: !isEditable,
          }}
          defaultValue={teacher.firstName}
          onChange={handleEditChange('firstName')}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          inputProps={{
            readOnly: !isEditable,
          }}
          defaultValue={teacher.surname}
          onChange={handleEditChange('surname')}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          inputProps={{
            readOnly: !isEditable,
          }}
          type="number"
          defaultValue={teacher.totalHours}
          onChange={handleEditChange('totalHours')}
        />
      </TableCell>
      <TableCell align="right">
        {isEditable ? (
          <Tooltip title="Подтвердить изменения">
            <IconButton onClick={handleSave}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Редактировать данные преподавателя">
            <IconButton onClick={() => setIsEditable(true)}>
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
  );
};
