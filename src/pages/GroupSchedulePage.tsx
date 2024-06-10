import { useParams } from 'react-router-dom';
import { subjectApi } from '../services/subjects.service';
import { DaySchedule } from '../components/Tabs/DaySchedule/DaySchedule';
import { WEEK_DAYS } from '../constants';
import { Box, Button, Paper, Typography } from '@mui/material';
import { scheduleApi } from '../services/schedule.service';
import { LoadingCircle } from '../components/Loading';
import { Helmet } from 'react-helmet-async';
import { departmentApi } from '../services/department.service';
import { useState } from 'react';

export const GroupSchedulePage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Что-то пошло не так</div>;
  }

  const { data: group } = departmentApi.useGetOneGroupQuery({
    groupId: id,
    withSubjects: false,
  });

  const {
    data: subjects,
    isSuccess: isSubjectsSuccess,
    isLoading: isSubjectsLoading,
  } = subjectApi.useGetAllGroupSubjectsQuery({ id, includeZeroHours: false });

  const {
    data: scheduleData,
    isSuccess: isScheduleDataSuccess,
    isLoading: isScheduleLoading,
  } = scheduleApi.useGetGroupScheduleQuery(id);

  const {
    data: cabinets,
    isSuccess: isCabinetsSuccess,
    isLoading: isCabinetsLoading,
  } = subjectApi.useGetAllCabinetsQuery();

  const [save, setSave] = useState(false);

  if (!id) {
    return <div>Идентификатор группы не найден</div>;
  }

  if (isSubjectsLoading || isScheduleLoading || isCabinetsLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="px-3 py-2 w-full h-full">
      {group && (
        <>
          <Helmet>
            <title>{`${group.name} | Расписание`}</title>
          </Helmet>

          <div className="flex gap-3 items-center justify-between">
            <Typography variant="h5">{`Группа: ${group.name}`}</Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setSave(!save)}
            >
              Сохранить изменения
            </Button>
          </div>
        </>
      )}

      <div className="overflow-auto flex gap-2">
        {isSubjectsSuccess &&
          isCabinetsSuccess &&
          isScheduleDataSuccess &&
          subjects &&
          scheduleData && (
            // <TableContainer>
            //   <Table>
            //     <TableBody>
            <Box className="flex gap-10">
              {WEEK_DAYS.map(tab => {
                const scheduleForDay = scheduleData.find(
                  data => data.dayOfWeek === tab.value,
                );
                return (
                  <Paper key={tab.value}>
                    <div>
                      <Typography className="p-2" variant="body2">
                        {tab.label}
                      </Typography>
                    </div>
                    {scheduleForDay ? (
                      <DaySchedule
                        lastConfirm={scheduleForDay.lastConfirm}
                        dayOfWeek={tab.value}
                        groupId={id}
                        subjects={subjects}
                        scheduleData={scheduleForDay.scheduleSubjects}
                        save={save}
                        cabinets={cabinets}
                      />
                    ) : (
                      <DaySchedule
                        cabinets={cabinets}
                        dayOfWeek={tab.value}
                        groupId={id}
                        subjects={subjects}
                        save={save}
                      />
                    )}
                  </Paper>
                );
              })}
            </Box>
            //     </TableBody>
            //   </Table>
            // </TableContainer>
          )}
      </div>
    </div>
  );
};
