import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IGroup } from '../../../types/types';
import { IconButton } from '../../buttons/IconButton/IconButton';
import styles from './DropdownMenuItem.module.sass';

type DropdownMenuItemProps = {
  group: IGroup;
  departmentName: string;
  handleEditGroup: (groupId: string) => void;
  handleApproveModal: (group: IGroup, departmentName: string) => void;
};

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  group,
  departmentName,
  handleEditGroup,
  handleApproveModal,
}) => {
  const handleEditGroupClick = () => {
    handleEditGroup(group.id);
  };

  return (
    <Link to={`/groups/${group.id}`}>
      <li className={styles.dropdownMenu__item}>
        <span className={styles.item__text}>{group.name}</span>

        <div className={styles.iconButtons__container}>
          <IconButton handleClick={handleEditGroupClick}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            handleClick={() => handleApproveModal(group, departmentName)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </li>
    </Link>
  );
};
