import { useParams } from 'react-router-dom';
import { SubjectsTable } from '../components/Table/SubjectsTable';
import { useEffect } from 'react';

export const GroupPage = () => {
  const { id } = useParams();

  useEffect(() => console.log(id), [id]);

  return <div className="px-3">{id && <SubjectsTable id={id} />}</div>;
};
