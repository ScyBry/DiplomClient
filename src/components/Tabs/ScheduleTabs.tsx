import { Backdrop, Box, CircularProgress, Tab, Tabs } from '@mui/material';
import { TABS_HEADER } from '../../constants';
import { SyntheticEvent, useState } from 'react';
import { TabPanel } from './TabPanel/TabPanel';
import { departmentApi } from '../../services/department.service';
import { DaySchedule } from './DaySchedule/DaySchedule';

export const ScheduleTabs = () => {
  const { data, isLoading, isError, isSuccess } =
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
    console.log(data);
  }

  const scheduleData = [
    {
      lessonNumber: 1,
      time: '8:00 - 9:00',
      group: 'Group A',
      classroom: '101',
    },
    {
      lessonNumber: 2,
      time: '9:00 - 10:00',
      group: 'Group B',
      classroom: '102',
    },
    // Другие объекты расписания...
  ];

  return (
    <Box sx={{ width: `100%` }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleValueChange}>
          {TABS_HEADER.map(tab => (
            <Tab label={tab.label} id={tab.id} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DaySchedule scheduleData={scheduleData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DaySchedule />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Three
      </TabPanel>
    </Box>
  );
};
