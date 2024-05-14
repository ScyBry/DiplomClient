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

interface DropdownMenuProps {
  option: IDepartment;
  handleGroupModal: (departmentId: string) => void;
  handleEditGroup: (groupId: string) => void;
  handleApproveModal: (group: IGroup, departmentName: string) => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  option,
  handleGroupModal,
  handleEditGroup,
  handleApproveModal,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={option.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {option.groups.map(group => (
            <ListItemButton className="group flex gap-3">
              <ListItemIcon>
                <Link to={`/groups/${group.id}`}>
                  <ListItemText primary={group.name} />
                </Link>
              </ListItemIcon>
              <div className="invisible group-hover:visible">
                <Link to={`groupSchedule/${group.id}`}>
                  <Tooltip title="Расписание">
                    <IconButton>
                      <EditCalendarIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title="Изменить">
                  <IconButton onClick={() => handleEditGroup(group.id)}>
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
    </>
  );
};
