import { departmentApi } from '../../services/department.service';
import styles from './taskbar.module.sass';

export const Taskbar = () => {
  const { data } = departmentApi.useGetAllDepartmentsQuery(true);

  console.log(data);

  return (
    <aside className={styles.taskbar}>
      <div>
        <h1 className={styles.taskbar__title}>ВИТГТК</h1>
      </div>

      <div className={styles.taskbar__menu}>
        {data &&
          data.map((option, index) => <li key={index}>{option.name}</li>)}
      </div>
    </aside>
  );
};
