import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Backdrop } from '../../components/Backdrop/Backdrop';
import { AddSubjectForm } from '../../components/Forms/AddSubjectForm/AddSubjectForm.tsx';
import { Modal } from '../../components/Modal/Modal.tsx';
import { PageHeader } from '../../components/PageHeader/PageHeader.tsx';
import { CollapsibleTable } from '../../components/Table/Table.tsx';
import { departmentApi } from '../../services/department.service';

export const GroupPage = () => {
  const { id } = useParams<{ id: string }>();

  // const { data, isLoading } = departmentApi.useGetOneGroupQuery({
  //   groupId: id || '',
  //   withSubjects: false,
  // });

  const { data, isLoading } = departmentApi.useGetAllGroupSubjectsQuery(
    id || '',
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (isLoading)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );

  return (
    <section className="w-full ">
      <PageHeader title="aboba" />
      <div className="pr-4">
        {/*<IconButton*/}
        {/*  handleClick={() => setIsModalOpen(!isModalOpen)}*/}
        {/*  children={<AddCircleIcon fontSize="large" />}*/}
        {/*/>*/}

        {data && <CollapsibleTable data={data} />}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
        >
          <AddSubjectForm />
        </Modal>
      </div>
    </section>
  );
};
