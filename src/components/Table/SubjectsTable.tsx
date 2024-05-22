import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { subjectApi } from '../../services/subjects.service';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ISubject, ITeacher } from '../../types/types';
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
  Tooltip,
  Typography,
} from '@mui/material';
import { teacherApi } from '../../services/teacher.service';
import { Modal } from '../Modal/Modal';
import { AddSubjectForm } from '../Forms/AddSubjectForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApproveModal } from '../Modals/ApproveModal';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import { TransferList } from '../TransferList';

type RowProps = {
  row: ISubject;
  handleDeleteClick: (subjectId: string) => void;
};

type SubjectTableProps = {
  id: string;
  subjects: ISubject[];
};

export const SubjectsTable: FC<SubjectTableProps> = ({ id, subjects }) => {
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
            <div className="flex justify-between">
              <Typography className="p-3" variant="h5">
                Предметы
              </Typography>
            </div>
            <TableRow>
              <TableCell />
              <TableCell align="left">Предмет</TableCell>
              <TableCell align="left">Кол-во часов</TableCell>
              <TableCell align="right">
                <Tooltip title="Добавить новый предмет">
                  <IconButton onClick={() => setIsAddModalOpen(true)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects &&
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

const Row: FC<RowProps> = ({ row, handleDeleteClick }) => {
  const [assignSubjectsToTeacher, { isLoading, isSuccess, isError, error }] =
    teacherApi.useAssignSubjectsToTeacherMutation();
  const [editSubject] = subjectApi.useEditSubjectMutation(row.id);
  const { data: teachers } = teacherApi.useGetAllTeachersQuery();

  const [open, setOpen] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<string>(row.teachers[0]?.id);
  const [editName, setEditName] = useState<boolean>(false);
  const [subjectNameField, setSubjectNameField] = useState<string>('');
  const [subjectHoursField, setSubjectHoursField] = useState<number>();

  const handleNameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSubjectNameField(value);
  };

  const handleSubjectHoursFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value);
    setSubjectHoursField(value);
  };

  const handleEditClick = () => {
    editSubject({
      name: subjectNameField,
      hoursPerGroup: subjectHoursField,
    });
  };

  const handleAssignTeachers = async (selectedTeachers: ITeacher[]) => {
    try {
      await assignSubjectsToTeacher({
        teachers: selectedTeachers,
        subjectId: row.id,
      }).unwrap();
      toast.success('Преподаватели успешно назначены');
    } catch (err) {
      toast.error('Ошибка при назначении преподавателей');
    }
  };

  useEffect(() => {
    if (teachers) {
    }
  }, [teachers, row]);

  const filteredTeachers = teachers?.filter(
    teacher =>
      !row.teachers.some(assignedTeacher => assignedTeacher.id === teacher.id),
  );

  return (
    <>
      <TableRow
        className="hover:bg-gray-100"
        sx={{ '& > *': { borderBottom: 'unset' } }}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <TextField
            InputProps={{
              readOnly: !editName,
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
              readOnly: !editName,
            }}
            size="small"
            type="number"
            defaultValue={row.hoursPerGroup}
            onChange={handleSubjectHoursFieldChange}
          />
        </TableCell>
        <TableCell align="right" className="">
          {editName ? (
            <IconButton onClick={() => handleEditClick()}>
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEditName(!editName)}>
              <EditIcon />
            </IconButton>
          )}

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
              <TableCell>
                {teachers && filteredTeachers && row.teachers && (
                  <TransferList
                    isLoading={isLoading}
                    teachers={teachers}
                    assignedTeachers={row.teachers}
                    leftTitle="Доступные преподаватели"
                    rightTitle="Выбранные преподаватели"
                    onTransfer={selectedTeachers =>
                      handleAssignTeachers(selectedTeachers)
                    }
                  />
                )}
              </TableCell>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
