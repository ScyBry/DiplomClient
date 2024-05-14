import { Backdrop, Box, CircularProgress, Tab, Tabs } from '@mui/material';
import { WEAK_DAYS } from '../../constants';
import { SyntheticEvent, useState } from 'react';
import { TabPanel } from './TabPanel/TabPanel';
import { departmentApi } from '../../services/department.service';
import { DepartmentWrapper } from './DepartmentWrapper/DepartmentWrapper';

export const ScheduleTabs = () => {
  const { data, isLoading, isSuccess } =
    departmentApi.useGetAllDepartmentsQuery(true);

  const [value, setValue] = useState<number>(0);

  const handleValueChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (isSuccess) {
    data;
  }

  return (
    <Box sx={{ width: `100%`, overflow: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', overflow: 'auto' }}>
        <Tabs
          sx={{ overflow: 'auto' }}
          value={value}
          onChange={handleValueChange}
        >
          {WEAK_DAYS.map(tab => (
            <Tab key={tab.id} label={tab.label} id={tab.id} />
          ))}
        </Tabs>
      </Box>
      <div className="overflow-auto">
        {WEAK_DAYS.map((_, index) => (
          <TabPanel value={value} index={index} key={index}>
            {data?.map(department => (
              <div className="overflow-auto flex">
                <DepartmentWrapper
                  department={department}
                  key={department.id}
                />
              </div>
            ))}
          </TabPanel>
        ))}
      </div>
    </Box>
  );
};
