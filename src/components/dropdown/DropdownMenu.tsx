import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { IDepartment, IGroup } from '../../types/types';
import { DropdownMenuItem } from '../Items/DropDownMenuItem/DropDownMenuItem';
import { MenuAddButton } from '../buttons/MenuAddButton/MenuAddButton';
import styles from './dropdown.module.sass';

interface DropdownMenuProps {
  option: IDepartment;
  handleGroupModal: (departmentId: string) => void;
  handleEditGroup: (groupId: string) => void;
  handleApproveModal: (group: IGroup, departmentName: string) => void;
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  option,
  handleGroupModal,
  handleEditGroup,
  handleApproveModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddGroup = () => {
    handleGroupModal(option.id);
  };

  return (
    <div className={styles.dropdownMenu}>
      <div
        className={classNames(styles.toggleButton, styles.option, {
          [styles.active]: isOpen === true,
        })}
        onClick={toggleMenu}
      >
        <span>{option.name}</span>
        <ArrowForwardIosIcon
          style={{
            transition: '0.3s',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          fontSize="small"
        ></ArrowForwardIosIcon>
      </div>
      {isOpen && (
        <ul className={styles.dropdown__content}>
          {option.groups.map(group => (
            <DropdownMenuItem
              key={group.id}
              group={group}
              departmentName={option.name}
              handleApproveModal={handleApproveModal}
              handleEditGroup={handleEditGroup}
            ></DropdownMenuItem>
          ))}
          <MenuAddButton
            onClick={handleAddGroup}
            text="Добавить группу"
          ></MenuAddButton>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
