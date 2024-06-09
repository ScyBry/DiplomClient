import { FC, useEffect, useState, ChangeEvent } from 'react';
import {
  ICabinet,
  IScheduleDay,
  ISubject,
  ScheduleSubject,
} from '../../../types/types';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Link } from 'react-router-dom';

type LessonItemProps = {
  subjects: ISubject[];
  index: number;
  matchingSubject?: ScheduleSubject;
  conflict?: any;
  cabinets: ICabinet[];
  item: any;
  registerGetData: (getData: () => IScheduleDay) => void;
};

export const LessonItem: FC<LessonItemProps> = ({
  subjects,
  index,
  matchingSubject,
  conflict,
  cabinets,
  item,
  registerGetData,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(
    matchingSubject ? matchingSubject.subjectId : '',
  );

  const [selectedRooms, setSelectedRooms] = useState<ICabinet[]>(() => {
    if (matchingSubject) {
      return matchingSubject.ScheduleSubjectCabinet.map(cabinet =>
        cabinets.find(c => c.id === cabinet.cabinetId),
      );
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    registerGetData(() => ({
      orderNumber: index,
      subjectId: selectedSubject,
      cabinets: selectedRooms.map(cabinet => cabinet.id),
    }));
  }, [selectedSubject, selectedRooms, index]);

  const handleSubjectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedSubject(value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRoomsChange = (event: any, newValue: ICabinet[]) => {
    setSelectedRooms(newValue);
  };

  const filteredCabinets = cabinets.filter(cabinet =>
    cabinet.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    setSearchQuery('');
  }, [index]);

  return (
    <>
      <div className="px-4 py-1 flex gap-2 items-center">
        <Typography variant="body2" className="min-w-5">
          {index + 1}
        </Typography>

        <Select
          error={conflict}
          fullWidth
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="min-w-[170px]"
          size="small"
        >
          <MenuItem value="">Ничего</MenuItem>
          {subjects.map(subject => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>

        <FormControl sx={{ m: 1, width: 600 }}>
          <Autocomplete
            multiple
            size="small"
            value={selectedRooms}
            onChange={handleRoomsChange}
            options={filteredCabinets}
            getOptionLabel={option => option.roomNumber}
            renderInput={params => (
              <TextField
                {...params}
                label="Кабинеты"
                placeholder="Поиск кабинета"
                onChange={handleSearchChange}
                value={searchQuery}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} />
                {option.roomNumber}
              </li>
            )}
          />
        </FormControl>

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
