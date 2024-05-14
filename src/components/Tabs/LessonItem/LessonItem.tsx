import { FC, useEffect, useState } from 'react';
import {
  IScheduleSubject,
  ISubject,
  ScheduleSubject,
} from '../../../types/types';
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

type LessonItemProps = {
  subjects: ISubject[];
  index: number;
  handleSaveClick: any;
  save: boolean;
  matchingSubject?: ScheduleSubject;
};

export const LessonItem: FC<LessonItemProps> = ({
  subjects,
  save,
  index,
  handleSaveClick,
  matchingSubject,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(
    matchingSubject ? matchingSubject.subjectId : '',
  );

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedSubject(value);
  };

  const [textFieldValue, setTextFieldValue] = useState(
    matchingSubject ? matchingSubject.roomNumber : '',
  );

  const handleTextFieldChange = event => {
    setTextFieldValue(event.target.value);
  };

  useEffect(() => {
    if (save) {
      handleSaveClick({
        orderNumber: index,
        subjectId: selectedSubject,
        roomNumber: textFieldValue,
      });
      setTextFieldValue('');
    }
  }, [save]);

  return (
    <div className="px-4 py-1 flex gap-1">
      <FormControl fullWidth>
        <Select size="small" value={selectedSubject} onChange={handleChange}>
          <MenuItem value={''}>Ничего</MenuItem>
          {subjects.map(subject => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        onChange={handleTextFieldChange}
        className="w-24"
        size="small"
        defaultValue={matchingSubject ? matchingSubject.roomNumber : ''}
      />
      <IconButton>
        <DragHandleIcon />
      </IconButton>
    </div>
  );
};
