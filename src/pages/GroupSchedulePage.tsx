import { useParams } from 'react-router-dom';
import { subjectApi } from '../services/subjects.service';
import { DaySchedule } from '../components/Tabs/DaySchedule/DaySchedule';
import { WEEK_DAYS } from '../constants';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
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
  } = subjectApi.useGetAllGroupSubjectsQuery(id);

  const {
    data: scheduleData,
    isSuccess: isScheduleDataSuccess,
    isLoading: isScheduleLoading,
  } = scheduleApi.useGetGroupScheduleQuery(id);

  const { data: cabinets, isSuccess: isCabinetsSuccess } =
    subjectApi.useGetAllCabinetsQuery();

  const [save, setSave] = useState(false);

  if (!id) {
    return <div>Идентификатор группы не найден</div>;
  }

  if (isSubjectsLoading || isScheduleLoading) {
    return <LoadingCircle />;
  }

  if (
    isSubjectsSuccess &&
    isCabinetsSuccess &&
    isScheduleDataSuccess &&
    subjects &&
    scheduleData
  ) {
    return (
      <div className="px-3 py-2 w-full h-full">
        {group && (
          <>
            <Helmet>
              <title>{`${group.name} | Расписание`}</title>
            </Helmet>

            <div className="flex gap-3 items-center">
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

        <div className="h-[100vh] overflow-auto flex gap-2">
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  {WEEK_DAYS.map(tab => {
                    const scheduleForDay = scheduleData.find(
                      data => data.dayOfWeek === tab.value,
                    );
                    return (
                      <TableCell key={tab.value}>
                        <Paper>
                          <Typography className="p-2" variant="body2">
                            {tab.label}
                          </Typography>
                          {scheduleForDay ? (
                            <DaySchedule
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
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }

  return <div>Ошибка загрузки расписания группы</div>;
};
