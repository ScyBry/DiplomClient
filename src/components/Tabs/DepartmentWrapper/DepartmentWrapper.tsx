import { FC } from 'react';
import { IDepartment } from '../../../types/types';
import { Typography } from '@mui/material';
import { DaySchedule } from '../DaySchedule/DaySchedule';

type DepartmentWrapperProps = {
  department: IDepartment;
};

export const DepartmentWrapper: FC<DepartmentWrapperProps> = ({
  department,
}) => {
  return (
    <div className="overflow-auto">
      <Typography>{department.name}</Typography>

      <div className="flex gap-1 overflow-auto">
        {department.groups.map(group => (
          <DaySchedule key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};
