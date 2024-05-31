import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import { FC, useEffect, useState, useRef } from 'react';
import { Reorder } from 'framer-motion';
import { LessonItem } from '../LessonItem/LessonItem';
import {
  ICabinet,
  IScheduleDay,
  ISubject,
  ScheduleSubject,
} from '../../../types/types';
import { scheduleApi } from '../../../services/schedule.service';

import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { ApproveModal } from '../../Modals/ApproveModal';

let conflict: any = null;

type DayScheduleProps = {
  subjects: ISubject[];
  groupId: string;
  dayOfWeek: string;
  scheduleData?: ScheduleSubject[];
  save: boolean;
  cabinets: ICabinet[];
};

export const DaySchedule: FC<DayScheduleProps> = ({
  subjects,
  groupId,
  dayOfWeek,
  scheduleData,
  save,
  cabinets,
}) => {
  const [saveDaySchedule, { data: conflicts }] =
    scheduleApi.useSaveDayScheduleMutation();
  const [confirmSchedule] = scheduleApi.useConfirmScheduleMutation();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);

  const [items, setItems] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);
  const [selectedLessonItems, setSelectedLessonItems] = useState<
    IScheduleDay[]
  >([]);
  const lessonRefs = useRef<Array<() => any>>([]);

  const handleSaveClick = () => {
    const lessonData = lessonRefs.current.map(getData => getData());
    setSelectedLessonItems(lessonData);
    handleSaveData(lessonData);
  };

  const handleSaveData = async (lessonData: any[]) => {
    const data = {
      groupId: groupId,
      dayOfWeek,
      daySubjects: lessonData,
    };

    saveDaySchedule(data)
      .unwrap()
      .then(response => console.log(response))
      .catch(error => toast.error(error.data.message));
  };

  const handleConfirmSchedule = () => {
    if (scheduleData && scheduleData[0])
      confirmSchedule(scheduleData[0].dayScheduleId)
        .then(() => {
          toast.success('Расписание подтверждено');
          setIsApproveModalOpen(false);
        })
        .catch(error => {
          toast.error(error.data.message);
          setIsApproveModalOpen(false);
        });
  };

  useEffect(() => {
    handleSaveClick();
  }, [save]);

  return (
    <div className="flex p-2">
      <div className="flex items-center">
        <LoadingButton
          fullWidth
          sx={{ transform: 'rotate(-90deg)' }}
          onClick={() => setIsApproveModalOpen(true)}
        >
          подтвердить
        </LoadingButton>
      </div>
      <Reorder.Group axis="y" values={items} onReorder={setItems}>
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
                index={index}
                subjects={subjects}
                matchingSubject={matchingScheduleItem}
                conflict={conflict && conflict}
                registerGetData={getData => {
                  lessonRefs.current[index] = getData;
                }}
                cabinets={cabinets}
              />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
      <ApproveModal
        text="По нажатию на кнопку вам пиздец"
        handleClose={() => setIsApproveModalOpen(false)}
        isOpen={isApproveModalOpen}
        func={handleConfirmSchedule}
      />
    </div>
  );
};
