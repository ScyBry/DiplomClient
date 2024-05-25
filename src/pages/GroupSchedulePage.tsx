import { useParams } from 'react-router-dom';
import { subjectApi } from '../services/subjects.service';
import { DaySchedule } from '../components/Tabs/DaySchedule/DaySchedule';
import { WEAK_DAYS } from '../constants';
import { Paper, Typography } from '@mui/material';
import { scheduleApi } from '../services/schedule.service';
import { LoadingCircle } from '../components/Loading';
import { Helmet } from 'react-helmet-async';
import { departmentApi } from '../services/department.service';

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

  if (!id) {
    return <div>Идентификатор группы не найден</div>;
  }

  if (isSubjectsLoading || isScheduleLoading) {
    return <LoadingCircle />;
  }

  if (isSubjectsSuccess && isScheduleDataSuccess && subjects && scheduleData) {
    return (
      <div className="px-3 py-2">
        {group && (
          <>
            <Helmet>
              <title>{`${group.name} | Расписание`}</title>
            </Helmet>

            <Typography variant="h5">{`Группа: ${group.name}`}</Typography>
          </>
        )}

        <div className="h-[93vh] overflow-auto flex gap-2">
          {WEAK_DAYS.map(tab => {
            const scheduleForDay = scheduleData.find(
              data => data.dayOfWeek === tab.label,
            );
            return (
              <Paper key={tab.id}>
                <Typography className="p-2" variant="body2">
                  {tab.label}
                </Typography>
                {scheduleForDay ? (
                  <DaySchedule
                    dayOfWeek={tab.label}
                    groupId={id}
                    subjects={subjects}
                    scheduleData={scheduleForDay.scheduleSubjects}
                  />
                ) : (
                  <DaySchedule
                    dayOfWeek={tab.label}
                    groupId={id}
                    subjects={subjects}
                  />
                )}
              </Paper>
            );
          })}
        </div>
      </div>
    );
  }

  return <div>Ошибка загрузки расписания группы</div>;
};
