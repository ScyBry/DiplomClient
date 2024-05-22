import { redirect, useParams } from 'react-router-dom';
import { SubjectsTable } from '../components/Table/SubjectsTable';
import { subjectApi } from '../services/subjects.service';
import { LoadingCircle } from '../components/Loading';

export const GroupSubjectsPage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Что-то пошло не так...</div>;
  }

  const { data: subjects, isLoading } =
    subjectApi.useGetAllGroupSubjectsQuery(id);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="px-3 py-2">
      {id && subjects && <SubjectsTable subjects={subjects} id={id} />}
    </div>
  );
};
