import { Paper } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';
import { LessonItem } from '../LessonItem/LessonItem';
import { IScheduleDay, ISubject, ScheduleSubject } from '../../../types/types';
import { scheduleApi } from '../../../services/schedule.service';
import { LoadingButton } from '@mui/lab';
import { Alert } from '../../Alert';

let conflict = null;

type DayScheduleProps = {
  subjects: ISubject[];
  groupId: string;
  dayOfWeek: string;
  scheduleData?: ScheduleSubject[];
};

export const DaySchedule: FC<DayScheduleProps> = ({
  subjects,
  groupId,
  dayOfWeek,
  scheduleData,
}) => {
  const [
    saveDaySchedule,
    { isLoading, data: conflicts, error, isError, isSuccess },
  ] = scheduleApi.useSaveDayScheduleMutation();

  const [items, setItems] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [save, setSave] = useState<boolean>(false);

  const [selectedLessonItems, setSelectedLessonItems] = useState<
    IScheduleDay[]
  >([]);

  const handleItemClick = (lessonItemData: IScheduleDay) => {
    const lessonData = lessonItemData;
    setSelectedLessonItems(prevState => [...prevState, lessonData]);
  };

  const handleSaveClick = () => {
    setSelectedLessonItems([]);
    setSave(true);
    setTimeout(() => setSave(false), 3000);
  };

  const handleSaveData = () => {
    const data = {
      groupId,
      dayOfWeek,
      daySubjects: selectedLessonItems,
    };

    saveDaySchedule(data);
  };

  useEffect(() => {
    selectedLessonItems;
  }, [selectedLessonItems]);

  return (
    <>
      <Paper className="p-2">
        <LoadingButton
          variant="contained"
          size="small"
          loading={isLoading}
          onClick={handleSaveClick}
        >
          Подтвердить изменения
        </LoadingButton>
        {selectedLessonItems.length === 12 && save && (
          <LoadingButton
            size="small"
            loading={isLoading}
            onClick={handleSaveData}
          >
            Сохранить изменения
          </LoadingButton>
        )}

        <Reorder.Group axis="y" values={items} onReorder={setItems}>
          <div className="flex">
            <div>
              {items.map((item, index) => {
                const matchingScheduleItem = scheduleData?.find(
                  scheduleItem => scheduleItem.orderNumber === item,
                );

                if (conflicts) {
                  conflict = conflicts.find(dataItem => {
                    return dataItem?.orderNumber == index;
                  });
                }

                if (matchingScheduleItem) {
                  return (
                    <Reorder.Item key={item} value={item}>
                      <LessonItem
                        save={save}
                        index={index}
                        subjects={subjects}
                        handleSaveClick={handleItemClick}
                        matchingSubject={matchingScheduleItem}
                        conflict={conflict}
                      />
                    </Reorder.Item>
                  );
                }
                return (
                  <Reorder.Item key={item} value={item}>
                    <LessonItem
                      save={save}
                      index={index}
                      subjects={subjects}
                      handleSaveClick={handleItemClick}
                    />
                  </Reorder.Item>
                );
              })}
            </div>
          </div>
        </Reorder.Group>
      </Paper>

      {isSuccess && <Alert severity="success">Сохранено успешно</Alert>}
      {isError && <Alert severity="error">{error.data.message}</Alert>}
    </>
  );
};
