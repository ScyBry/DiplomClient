import { useParams } from 'react-router-dom';
import { SubjectsTable } from '../components/Table/SubjectsTable';
import { subjectApi } from '../services/subjects.service';
import { LoadingCircle } from '../components/Loading';

import { departmentApi } from '../services/department.service';

export const GroupSubjectsPage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Что-то пошло не так...</div>;
  }

  const { data: subjects, isLoading: isSubjectsLoading } =
    subjectApi.useGetAllGroupSubjectsQuery({ id, includeZeroHours: true });

  const { data: group, isLoading: isLoadingGroup } =
    departmentApi.useGetOneGroupQuery({ groupId: id, withSubjects: true });

  if (isLoadingGroup || isSubjectsLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="px-3 py-2">
      {id && group && subjects && (
        <div>
          <SubjectsTable groupName={group.name} subjects={subjects} id={id} />
        </div>
      )}
    </div>
  );
};
