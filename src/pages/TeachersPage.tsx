import { useState } from 'react';
import { AddTeacherForm } from '../components/Forms/AddTeacherForm';
import { Modal } from '../components/Modal/Modal';
import { teacherApi } from '../services/teacher.service';
import { Backdrop, CircularProgress } from '@mui/material';
import { TeachersTable } from '../components/Table/TeachersTable';

export const TeachersPage = () => {
  const {
    data: teachers,
    isLoading,
    isSuccess,
  } = teacherApi.useGetAllTeachersQuery({});

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <div className="px-3">
      {isSuccess && (
        <TeachersTable
          teachers={teachers}
          setIsTeacherModalOpen={setIsTeacherModalOpen}
        />
      )}

      <Modal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(!isTeacherModalOpen)}
      >
        <AddTeacherForm />
      </Modal>
    </div>
  );
};
