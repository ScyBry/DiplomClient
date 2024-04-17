import { MoonLoader } from 'react-spinners';
import { departmentApi as departmentApiService } from '../../services/department.service';

import { useState } from 'react';
import { TaskbarSection } from '../taskbarSection/taskbarSection';
import styles from './taskbar.module.sass';

import { IGroup } from '../../types/types';
import { AddDepartmentForm } from '../Forms/AddDepartmentForm/AddDepartmentForm';
import { AddGroupForm } from '../Forms/AddGroupForm/AddGroupForm';
import { Modal } from '../Modal/Modal';
import { ApproveModal } from '../Modals/ApproveModal/ApproveModal';

export const Taskbar = () => {
  const { data, isLoading, error } =
    departmentApiService.useGetAllDepartmentsQuery(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] =
    useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [approveModalData, setApproveModalData] = useState<{
    group: IGroup;
    departmentName: string;
  }>({} as any);

  const handleDepartmentModal = () => {
    setIsDepartmentModalOpen(!isDepartmentModalOpen);
  };
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
      <div className={styles.loaderOverlay}>
        <MoonLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <aside className={styles.taskbar}>
      {data && (
        <TaskbarSection
          handleEditGroup={handleEditGroup}
          handleDepartmentModal={handleDepartmentModal}
          handleGroupModal={handleGroupModal}
          handleApproveModal={handleApproveModal}
          sectionTitle="Отделения"
          sectionData={data}
        />
      )}

      <Modal isOpen={isDepartmentModalOpen} onClose={handleDepartmentModal}>
        <AddDepartmentForm />
      </Modal>
      <Modal isOpen={isGroupModalOpen} onClose={handleGroupModal}>
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
    </aside>
  );
};
