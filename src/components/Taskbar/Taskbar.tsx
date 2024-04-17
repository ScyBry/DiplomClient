import { departmentApi } from '../../services/department.service';

import { useState } from 'react';
import { DepartmentTaskbarSection } from './DepartmentTaskbarSection/DepartmentTaskbarSection.tsx';

import { CircularProgress, List } from '@mui/material';
import { IGroup } from '../../types/types';
import { Backdrop } from '../Backdrop/Backdrop';
import { AddDepartmentForm } from '../Forms/AddDepartmentForm/AddDepartmentForm';
import { AddGroupForm } from '../Forms/AddGroupForm/AddGroupForm';
import { Modal } from '../Modal/Modal';
import { ApproveModal } from '../Modals/ApproveModal/ApproveModal';
import { NavigationTaskbarSection } from './NavigationTaskbarSection/NavigationTaskbarSection.tsx';

export const Taskbar = () => {
  const { data, isLoading } = departmentApi.useGetAllDepartmentsQuery(false);

  const [isDepartmentModalOpen, setIsDepartmentModalOpen] =
    useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [approveModalData, setApproveModalData] = useState<{
    group: IGroup;
    departmentName: string;
  }>({} as any);

  const handleGroupModal = (departmentId: string) => {
    setIsGroupModalOpen(!isGroupModalOpen);
    setSelectedDepartment(departmentId);
  };

  const handleEditGroup = (groupId: string) => {
    console.log(`Editing group with id ${groupId}`);
  };

  const handleApproveModal = (group: IGroup, departmentName: string) => {
    setApproveModalData({
      group,
      departmentName,
    });
    setIsApproveModalOpen(!isApproveModalOpen);
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
      {data && (
        <DepartmentTaskbarSection
          handleEditGroup={handleEditGroup}
          handleDepartmentModal={() =>
            setIsDepartmentModalOpen(!isDepartmentModalOpen)
          }
          handleGroupModal={handleGroupModal}
          handleApproveModal={handleApproveModal}
          sectionTitle="Отделения"
          sectionData={data}
        />
      )}

      <Modal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(!isDepartmentModalOpen)}
      >
        <AddDepartmentForm />
      </Modal>
      <Modal isOpen={isGroupModalOpen} onClose={() => handleGroupModal}>
        <AddGroupForm departmentId={selectedDepartment} />
      </Modal>

      {approveModalData && (
        <ApproveModal
          group={approveModalData?.group}
          departmentName={approveModalData.departmentName}
          isOpen={isApproveModalOpen}
          onClose={handleApproveModal}
        />
      )}
    </List>
  );
};
