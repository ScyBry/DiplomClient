import { useState } from 'react';
import { Modal } from '../components/Modal/Modal';
import { Backdrop, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { UsersTable } from '../components/Table/UsersTable';
import { userApi } from '../services/user.service';
import { RegisterForm } from '../components/Forms/AuthForms/RegisterForm';

export const UsersPage = () => {
  const { data: users, isLoading, isSuccess } = userApi.useFindAllQuery();

  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <div className="px-3 py-2">
      <Helmet>
        <title>Пользователи | Расписание</title>
      </Helmet>
      {isSuccess && (
        <UsersTable users={users} setIsUserModalOpen={setIsUserModalOpen} />
      )}

      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(!isUserModalOpen)}
      >
        <RegisterForm />
      </Modal>
    </div>
  );
};
