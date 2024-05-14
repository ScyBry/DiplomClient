import { departmentApi } from '../../services/department.service';

import { useState } from 'react';
import { DepartmentTaskbarSection } from './DepartmentTaskbarSection/DepartmentTaskbarSection.tsx';

import { CircularProgress, List } from '@mui/material';
import { IGroup } from '../../types/types';
import { Backdrop } from '../Backdrop/Backdrop';
import { AddDepartmentForm } from '../Forms/AddDepartmentForm.tsx';
import { AddGroupForm } from '../Forms/AddGroupForm/AddGroupForm';
import { Modal } from '../Modal/Modal';
import { ApproveModal } from '../Modals/ApproveModal.tsx';
import { NavigationTaskbarSection } from './NavigationTaskbarSection/NavigationTaskbarSection.tsx';

export const Taskbar = () => {
  const { data: departments, isLoading } =
    departmentApi.useGetAllDepartmentsQuery(false);
  const [deleteGroup] = departmentApi.useDeleteGroupMutation();

  const [isDepartmentModalOpen, setIsDepartmentModalOpen] =
    useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [approveModalData, setApproveModalData] = useState<{
    group: IGroup;
    departmentName: string;
  } | null>(null);

  const handleGroupModal = (departmentId: string) => {
    setIsGroupModalOpen(!isGroupModalOpen);
    setSelectedDepartment(departmentId);
  };

  const handleEditGroup = (groupId: string) => {
    `Editing group with id ${groupId}`;
  };

  const handleApproveModal = (group: IGroup, departmentName: string) => {
    setApproveModalData({
      group,
      departmentName,
    });
    setIsApproveModalOpen(true);
  };

  const handleDeleteGroup = () => {
    deleteGroup(approveModalData?.group.id);
    setIsApproveModalOpen(false);
  };

  if (isLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <List sx={{ width: '100%', maxWidth: '360px' }}>
      <NavigationTaskbarSection sectionTitle="Навигация" />
      {departments && (
        <DepartmentTaskbarSection
          handleEditGroup={handleEditGroup}
          handleDepartmentModal={() =>
            setIsDepartmentModalOpen(!isDepartmentModalOpen)
          }
          handleGroupModal={handleGroupModal}
          handleApproveModal={handleApproveModal}
          sectionTitle="Отделения"
          sectionData={departments}
        />
      )}

      <Modal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(!isDepartmentModalOpen)}
      >
        <AddDepartmentForm />
      </Modal>

      <Modal
        isOpen={isGroupModalOpen}
        onClose={() => handleGroupModal(selectedDepartment)}
      >
        <AddGroupForm departmentId={selectedDepartment} />
      </Modal>

      {approveModalData && (
        <ApproveModal
          text={`Вы действительно хотите удалить группу ${approveModalData.group.name} из ${approveModalData.departmentName}`}
          isOpen={isApproveModalOpen}
          handleClose={() => setIsApproveModalOpen(false)}
          func={handleDeleteGroup}
        />
      )}
    </List>
  );
};
