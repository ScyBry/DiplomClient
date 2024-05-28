import { FC, useEffect, useState, ChangeEvent } from 'react';
import { IScheduleDay, ISubject, ScheduleSubject } from '../../../types/types';
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Link } from 'react-router-dom';

type LessonItemProps = {
  subjects: ISubject[];
  index: number;
  save: boolean;
  matchingSubject?: ScheduleSubject;
  conflict?: any;
  registerGetData: (getData: () => IScheduleDay) => void;
};

export const LessonItem: FC<LessonItemProps> = ({
  subjects,
  save,
  index,
  matchingSubject,
  conflict,
  registerGetData,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(
    matchingSubject ? matchingSubject.subjectId : '',
  );

  const [textFieldValue, setTextFieldValue] = useState(
    matchingSubject ? matchingSubject.roomNumber : '',
  );

  useEffect(() => {
    registerGetData(() => ({
      orderNumber: index,
      subjectId: selectedSubject,
      roomNumber: textFieldValue,
    }));
    console.log(index);
  }, [selectedSubject, textFieldValue, index]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === '') setTextFieldValue('');
    setSelectedSubject(value);
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <>
      <div className="px-4 py-1 flex gap-2 items-center">
        <Typography variant="body2" className="min-w-5">
          {index + 1}
        </Typography>

        <Select
          error={conflict}
          fullWidth
          size="small"
          value={selectedSubject}
          onChange={handleChange}
          className="min-w-[300px]"
        >
          <MenuItem value="">Ничего</MenuItem>
          {subjects.map(subject => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          error={conflict}
          onChange={handleTextFieldChange}
          className="w-24"
          size="small"
          value={textFieldValue}
        />
        <IconButton>
          <DragHandleIcon />
        </IconButton>
      </div>
      {conflict && (
        <Link
          to={`/groupSchedule/${conflict.DaySchedule.groupId}`}
          target="_blank"
        >
          <div className="ml-11">
            <Typography variant="body2" color="error">
              {`Конфликт: Группа:  ${conflict.DaySchedule.Group.name}, Предмет: ${conflict.subject.name}`}
            </Typography>
          </div>
        </Link>
      )}
    </>
  );
};
