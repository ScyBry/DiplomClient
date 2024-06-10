import { FC, useState } from 'react';
import { IDepartment, IGroup } from '../../types/types';
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { ApproveModal } from '../Modals/ApproveModal';
import { departmentApi } from '../../services/department.service';
import { toast } from 'react-toastify';
import { Modal } from '../Modal/Modal';
import { EditDepartmentForm } from '../Forms/EditDepartmentForm';
import { EditGroupForm } from '../Forms/EditGroupForm';

interface DropdownMenuProps {
  option: IDepartment;
  handleGroupModal: (departmentId: string) => void;
  handleApproveModal: (group: IGroup, departmentName: string) => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  option,
  handleGroupModal,
  handleApproveModal,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();
  const [open, setOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [deleteDepartment] = departmentApi.useDeleteDepartmentMutation();
  const [editDepartmentModal, setEditDepartmentModal] =
    useState<boolean>(false);
  const [editGroupModal, setEditGroupModal] = useState<boolean>(false);

  const handleDepartmentDelete = () => {
    deleteDepartment(option.id)
      .unwrap()
      .then(() => toast.success('Отделение успешно удалено'))
      .catch(error => toast.error(error.data.message));

    setIsApproveModalOpen(true);
  };

  const handleEditGroup = (group: IGroup) => {
    setSelectedGroup(group);
    setEditGroupModal(true);
  };

  return (
    <>
      <ListItemButton className="group" onClick={() => setOpen(!open)}>
        <ListItemText primary={option.name} />
        <ListItemIcon className="invisible group-hover:visible">
          <Tooltip title="Редактировать название отделения">
            <IconButton
              size="small"
              onClick={() => setEditDepartmentModal(true)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить отделение">
            <IconButton
              size="small"
              onClick={() => setIsApproveModalOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemIcon>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {option.groups.map(group => (
            <ListItemButton key={group.id} className="group flex gap-3">
              <ListItemIcon>
                <Link to={`/groups/${group.id}`}>
                  <ListItemText primary={group.name} />
                </Link>
              </ListItemIcon>
              <div className="invisible group-hover:visible">
                <Link
                  to={`/groupSchedule/${group.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <a target="_blank" rel="noreferrer">
                    <Tooltip title="Расписание">
                      <IconButton>
                        <EditCalendarIcon />
                      </IconButton>
                    </Tooltip>
                  </a>
                </Link>
                <Tooltip title="Изменить группу">
                  <IconButton onClick={() => handleEditGroup(group)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Удалить группу">
                  <IconButton
                    onClick={() => handleApproveModal(group, option.name)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </ListItemButton>
          ))}
        </List>
        <ListItemButton
          className="flex items-center gap-2"
          onClick={() => handleGroupModal(option.id)}
        >
          <AddIcon fontSize="small" />

          <ListItemText primary="Добавить группу" />
        </ListItemButton>
        <Divider />
      </Collapse>

      <ApproveModal
        isOpen={isApproveModalOpen}
        handleClose={() => setIsApproveModalOpen(false)}
        func={handleDepartmentDelete}
        text={`Вы действительно хотите удалить отделение ${option.name}? Все связанные с ним группы будут так же удалены.`}
      />

      <Modal
        isOpen={editDepartmentModal}
        onClose={() => setEditDepartmentModal(false)}
      >
        <EditDepartmentForm department={option} />
      </Modal>
      {selectedGroup && (
        <Modal isOpen={editGroupModal} onClose={() => setEditGroupModal(false)}>
          <EditGroupForm group={selectedGroup} />
        </Modal>
      )}
    </>
  );
};
