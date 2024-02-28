import { useParams } from 'react-router-dom';
import { departmentApi } from '../../services/department.service';

export const GroupPage = () => {
  const { id } = useParams();

  const [] = departmentApi.useGetAllDepartmentsQuery;

  return <div>Группа</div>;
};
