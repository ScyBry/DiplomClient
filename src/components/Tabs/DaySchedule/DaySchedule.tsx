import { IconButton, Paper, Tooltip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';
import { LessonItem } from '../LessonItem/LessonItem';
import { IScheduleDay, ISubject, ScheduleSubject } from '../../../types/types';
import { scheduleApi } from '../../../services/schedule.service';

import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

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
  const [saveDaySchedule, { isLoading, data: conflicts }] =
    scheduleApi.useSaveDayScheduleMutation();

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

    saveDaySchedule(data)
      .unwrap()
      .then(() => toast.success('Расписание успешно сохранено'))
      .catch(error => toast.error(error.data.message));
  };

  return (
    <div className="p-2">
      <Tooltip title="Сохранить изменения">
        <IconButton size="small" disabled={isLoading} onClick={handleSaveClick}>
          <SaveIcon />
        </IconButton>
      </Tooltip>
      {selectedLessonItems.length === 12 && save && (
        <Tooltip title="Отправить изменения">
          <IconButton
            size="small"
            disabled={isLoading}
            onClick={handleSaveData}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
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
    </div>
  );
};
