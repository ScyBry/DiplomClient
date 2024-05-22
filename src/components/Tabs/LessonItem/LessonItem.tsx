import { FC, useEffect, useState, ChangeEvent } from 'react';
import { ISubject, ScheduleSubject } from '../../../types/types';
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
  handleSaveClick: any;
  save: boolean;
  matchingSubject?: ScheduleSubject;
  conflict?: any;
};

export const LessonItem: FC<LessonItemProps> = ({
  subjects,
  save,
  index,
  handleSaveClick,
  matchingSubject,
  conflict,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(
    matchingSubject ? matchingSubject.subjectId : '',
  );

  useEffect(() => {
    console.log('sjdfdsf', conflict);
  }, [conflict]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === '') setTextFieldValue('');

    setSelectedSubject(value);
  };

  const [textFieldValue, setTextFieldValue] = useState(
    matchingSubject ? matchingSubject.roomNumber : '',
  );

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  useEffect(() => {
    if (save) {
      handleSaveClick({
        orderNumber: index,
        subjectId: selectedSubject,
        roomNumber: textFieldValue,
      });
    }
  }, [save]);

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
          defaultValue={matchingSubject ? matchingSubject.roomNumber : ''}
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
