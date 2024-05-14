import { useParams } from 'react-router-dom';
import { SubjectsTable } from '../components/Table/SubjectsTable';

export const GroupPage = () => {
  const { id } = useParams();

  return <div className="px-3">{id && <SubjectsTable id={id} />}</div>;
};
