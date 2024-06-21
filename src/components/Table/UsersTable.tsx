import {
  IconButton,
  InputAdornment,
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
import {
  TEACHER_TABLE_HEAD_ROWS,
  USERS_TABLE_HEAD_ROWS,
} from '../../constants';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { IUser } from '../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApproveModal } from '../Modals/ApproveModal';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import { userApi } from '../../services/user.service';

type TeachersTableProps = {
  users: IUser[];
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;
};

export const UsersTable: FC<TeachersTableProps> = ({
  users,
  setIsUserModalOpen,
}) => {
  const [deleteUser] = userApi.useDeleteUserMutation();
  const [updateUser] = userApi.useUpdateUserMutation();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleDeleteClick = (user: IUser) => {
    setSelectedUser(user);
    setIsApproveModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id)
        .unwrap()
        .then(() => toast.success('Пользователь успешно удален'))
        .catch(error => toast.error(error.data.message));
      setIsApproveModalOpen(false);
    }
  };

  const handleSaveClick = (user: IUser, data: Partial<IUser>) => {
    updateUser({ id: user.id, user: data })
      .unwrap()
      .then(() => toast.success('Данные пользователя успешно обновлены'))
      .catch(error => toast.error(error.data.message));
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            <div className="p-3 flex gap-3">
              <Typography className="p-3" variant="h5">
                Пользователи
              </Typography>
              <TextField
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <TableRow>
              {USERS_TABLE_HEAD_ROWS.map(row => (
                <TableCell key={row} align="left">
                  {row}
                </TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Добавить пользователя">
                  <IconButton onClick={() => setIsUserModalOpen(true)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>

          {filteredUsers.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={TEACHER_TABLE_HEAD_ROWS.length + 1}>
                  <Typography variant="h4" align="center">
                    Ничего не найдено
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filteredUsers.map(user => (
                <TeachersTableRow
                  key={user.id}
                  user={user}
                  handleDeleteClick={handleDeleteClick}
                  handleSaveClick={handleSaveClick}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {selectedUser && (
        <ApproveModal
          text={`Вы действительно хотите удалить пользователя?`}
          handleClose={() => setIsApproveModalOpen(false)}
          isOpen={isApproveModalOpen}
          func={handleDelete}
        />
      )}
    </>
  );
};

type TeachersTableRowProps = {
  user: IUser;
  handleDeleteClick: (user: IUser) => void;
  handleSaveClick: (user: IUser, data: Partial<IUser>) => void;
};

const TeachersTableRow: FC<TeachersTableRowProps> = ({
  user,
  handleDeleteClick,
  handleSaveClick,
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<Partial<IUser>>({});

  const handleEditChange =
    (field: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedUser(prev => ({ ...prev, [field]: event.target.value }));
    };

  const handleSave = () => {
    handleSaveClick(user, editedUser);
    setIsEditable(false);
    console.log(editedUser);
  };

  return (
    <TableRow key={user.id} className="hover:bg-gray-100">
      <TableCell align="left">
        <TextField
          inputProps={{
            readOnly: !isEditable,
          }}
          defaultValue={user.email}
          onChange={handleEditChange('email')}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          inputProps={{
            readOnly: !isEditable,
          }}
          defaultValue={user.username}
          onChange={handleEditChange('username')}
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
          <Tooltip title="Редактировать данные пользователя">
            <IconButton onClick={() => setIsEditable(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Удалить пользователя">
          <IconButton onClick={() => handleDeleteClick(user)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
