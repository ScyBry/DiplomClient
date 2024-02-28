import { FC } from 'react';
import { IDepartment, IGroup } from '../../types/types';
import { MenuAddButton } from '../buttons/MenuAddButton/MenuAddButton';
import DropdownMenu from '../dropdown/DropdownMenu';
import styles from './taskbarSection.module.sass';

type taskbarSectionProps = {
  sectionTitle: string;
  sectionData: IDepartment[];
  handleDepartmentModal: () => void;
  handleGroupModal: (departmentId: string) => void;
  handleEditGroup: (groupId: string) => void;
  handleApproveModal: (group: IGroup, departmentName: string) => void;
};

export const TaskbarSection: FC<taskbarSectionProps> = ({
  sectionTitle,
  sectionData,
  handleDepartmentModal,
  handleGroupModal,
  handleEditGroup,
  handleApproveModal,
}) => {
  return (
    <div className={styles.taskbarSection}>
      <div className={styles.section__title}>
        <h3>{sectionTitle}</h3>
      </div>
      <ul>
        {sectionData &&
          sectionData.map((option, index) => (
            <DropdownMenu
              handleEditGroup={handleEditGroup}
              handleGroupModal={handleGroupModal}
              handleApproveModal={handleApproveModal}
              key={index}
              option={option}
            />
          ))}
        <MenuAddButton
          text="Добавить отделение"
          onClick={handleDepartmentModal}
        ></MenuAddButton>
      </ul>
    </div>
  );
};
