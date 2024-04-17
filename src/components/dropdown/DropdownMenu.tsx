import { FC, useState } from 'react';
import { IDepartment, IGroup } from '../../types/types';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { IconButton } from '../buttons/IconButton/IconButton.tsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
            <ListItemButton className="flex gap-3">
              <ListItemIcon>
                <IconButton handleClick={() => handleEditGroup(group.id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  handleClick={() => handleApproveModal(group, option.name)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <Link to={`/groups/${group.id}`}>
                <ListItemText primary={group.name} />
              </Link>
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
      </Collapse>
    </>
  );
};
