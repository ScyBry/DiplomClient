import { IconButton, Paper, Tooltip } from '@mui/material';
import { FC, useEffect, useState, useRef } from 'react';
import { Reorder } from 'framer-motion';
import { LessonItem } from '../LessonItem/LessonItem';
import { IScheduleDay, ISubject, ScheduleSubject } from '../../../types/types';
import { scheduleApi } from '../../../services/schedule.service';

import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

let conflict: any = null;

type DayScheduleProps = {
  subjects: ISubject[];
  groupId: string;
  dayOfWeek: string;
  scheduleData?: ScheduleSubject[];
  aboba: boolean;
};

export const DaySchedule: FC<DayScheduleProps> = ({
  subjects,
  groupId,
  dayOfWeek,
  scheduleData,
  aboba,
}) => {
  const [saveDaySchedule, { data: conflicts }] =
    scheduleApi.useSaveDayScheduleMutation();

  const [items, setItems] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ]);
  const [selectedLessonItems, setSelectedLessonItems] = useState<
    IScheduleDay[]
  >([]);
  const lessonRefs = useRef<Array<() => IScheduleDay>>([]);

  const handleSaveClick = () => {
    const lessonData = lessonRefs.current.map(getData => getData());
    setSelectedLessonItems(lessonData);
    handleSaveData(lessonData);
  };

  const handleSaveData = async (lessonData: IScheduleDay[]) => {
    const data = {
      groupId,
      dayOfWeek,
      daySubjects: lessonData,
    };

    saveDaySchedule(data)
      .unwrap()
      .then()
      .catch(error => toast.error(error.data.message));
  };

  useEffect(() => {
    handleSaveClick();
  }, [aboba]);

  useEffect(() => {}, [conflicts]);

  return (
    <div className="p-2">
      <Reorder.Group axis="y" values={items} onReorder={setItems}>
        <div className="flex">
          <div>
            {items.map((item, index) => {
              const matchingScheduleItem = scheduleData?.find(
                scheduleItem => scheduleItem.orderNumber === item,
              );

              if (conflicts) {
                conflict = conflicts.find((dataItem: any) => {
                  return dataItem?.orderNumber == index;
                });
              }

              return (
                <Reorder.Item key={item} value={item}>
                  <LessonItem
                    save={true}
                    index={index}
                    subjects={subjects}
                    matchingSubject={matchingScheduleItem}
                    conflict={conflict && conflict}
                    registerGetData={getData => {
                      lessonRefs.current[index] = getData;
                    }}
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
