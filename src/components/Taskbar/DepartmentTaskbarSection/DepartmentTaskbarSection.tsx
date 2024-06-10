import { FC } from 'react';
import { IDepartment, IGroup } from '../../../types/types.ts';
import { ListItemButton, ListItemText, ListSubheader } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { DropdownMenu } from '../../dropdown/DropdownMenu.tsx';

type DepartmentTaskbarSectionProps = {
  sectionTitle: string;
  sectionData: IDepartment[];
  handleDepartmentModal: () => void;
  handleGroupModal: (departmentId: string) => void;
  handleEditGroup: (groupId: string) => void;
  handleApproveModal: (group: IGroup, departmentName: string) => void;
};

export const DepartmentTaskbarSection: FC<DepartmentTaskbarSectionProps> = ({
  sectionTitle,
  sectionData,
  handleDepartmentModal,
  handleGroupModal,
  handleApproveModal,
}) => {
  return (
    <>
      <ListSubheader component="div" id="nested-list-subheader">
        {sectionTitle}
      </ListSubheader>
      <div>
        {sectionData &&
          sectionData.map(option => (
            <DropdownMenu
              option={option}
              handleGroupModal={handleGroupModal}
              handleApproveModal={handleApproveModal}
              key={option.name}
            />
          ))}
      </div>
      <ListItemButton
        className="flex items-center gap-2"
        onClick={handleDepartmentModal}
      >
        <AddIcon fontSize="small" />
        <ListItemText primary="Добавить отделение" />
      </ListItemButton>
    </>
  );
};
