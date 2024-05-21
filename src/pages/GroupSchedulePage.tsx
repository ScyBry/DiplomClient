import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { subjectApi } from '../services/subjects.service';
import { DaySchedule } from '../components/Tabs/DaySchedule/DaySchedule';
import { WEAK_DAYS } from '../constants';
import { Typography } from '@mui/material';
import { scheduleApi } from '../services/schedule.service';
import { LoadingCircle } from '../components/Loading';

export const GroupSchedulePage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Идентификатор группы не найден</div>;
  }

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

  if (isSubjectsLoading || isScheduleLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="h-[93vh] overflow-auto flex gap-2 p-2">
      {isSubjectsSuccess &&
        isScheduleDataSuccess &&
        WEAK_DAYS.map(tab => {
          const scheduleForDay = scheduleData.find(
            data => data.dayOfWeek === tab.label,
          );
          return (
            <div key={tab.id}>
              <Typography>{tab.label}</Typography>
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
            </div>
          );
        })}
    </div>
  );
};
