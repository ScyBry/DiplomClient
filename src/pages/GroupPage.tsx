import { useParams } from 'react-router-dom';
import { SubjectsTable } from '../components/Table/SubjectsTable';

export const GroupPage = () => {
  const { id } = useParams();

  return (
    <>
      <SubjectsTable id={id} />
    </>
  );
};
