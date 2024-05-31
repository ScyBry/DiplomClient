import { LoadingButton } from '@mui/lab';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { WEEK_DAYS } from '../constants';
import { scheduleApi } from '../services/schedule.service';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

export const CabinetPage = () => {
  const [findCabinets, { isLoading, data: availableRooms }] =
    scheduleApi.useFindAvailableCabinetsMutation();

  const subjects = [
    { period: 0, time: '8.00 - 8.45 | 8.00 - 8.30' },
    { period: 1, time: '8.55 - 9.40 | 8.35 - 9.05' },
    { period: 2, time: '9.50 - 10.35 | 9.10 - 9.40' },
    { period: 3, time: '10.45 - 11.30 | 9.45 - 10.15' },
    { period: 4, time: '11.40 - 12.25 | 10.20 - 10.50' },
    { period: 5, time: '12.35 - 13.20 | 10.55 - 11.25' },
    { period: 6, time: '13.30 - 14.15 | 11.30 - 12.00' },
    { period: 7, time: '14.25 - 15.10 | 12.05 - 12.35' },
    { period: 8, time: '15.20 - 16.05 | 12.40 - 13.10' },
    { period: 9, time: '16.15 - 17.00 | 13.15 - 13.45' },
    { period: 10, time: '17.10 - 17.55 | 13.50 - 14.20' },
    { period: 11, time: '18.05 - 18.50 | 14.25 - 14.55' },
    { period: 12, time: '19.00 - 19.45 | 15.00 - 15.30' },
    { period: 13, time: '19.55 - 20.40 | 15.35 - 16.05' },
    { period: 14, time: '20.50 - 21.35 | 16.10 - 16.40' },
  ];
  const [location, setLocation] = useState<string>('ГЛВ');
  const [day, setDay] = useState<string>(WEEK_DAYS[0].value);
  const [order, setOrder] = useState<number>(0);

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocation(value);
  };
  const handleSubjectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setDay(value);
  };
  const handleOrderChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setOrder(Number(value));
    console.log(order);
  };

  const handleSearch = () => {
    findCabinets({ day, orderNumber: order, location })
      .then(() => toast.success('Кабинеты найдены'))
      .catch(error => toast.error(error.data.message));
  };

  return (
    <Paper className="flex flex-col  gap-8 p-6">
      <Helmet>
        <title>Кабинеты | Расписание</title>
      </Helmet>
      <Typography variant="h6">Найти все свободные кабинеты</Typography>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Выберите день</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={day}
          label="Выберите день"
          onChange={handleSubjectChange}
          sx={{ minWidth: '300px' }}
        >
          {WEEK_DAYS.map(day => (
            <MenuItem value={day.value}>{day.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="demo-simple-select-label">
          Выберите время на которое нужен кабинет
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(order)}
          label="Выберите время на которое нужен кабинет"
          onChange={handleOrderChange}
          sx={{ minWidth: '300px' }}
        >
          {subjects.map(subject => (
            <MenuItem value={subject.period}>{subject.time}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel>Выберите корпус</FormLabel>
        <RadioGroup row onChange={handleLocationChange} value={location}>
          <FormControlLabel
            value="ГЛВ"
            label="Главный корпус"
            control={<Radio />}
          />
          <FormControlLabel
            value="УПК"
            label="Учебный корпус"
            control={<Radio />}
          />
        </RadioGroup>
      </FormControl>
      <LoadingButton
        onClick={handleSearch}
        loading={isLoading}
        loadingPosition="start"
        fullWidth
      >
        найти
      </LoadingButton>
      {availableRooms && (
        <div className="mt-4">
          <Typography variant="h6">Свободные кабинеты:</Typography>
          <ul>
            {availableRooms.map(room => (
              <li>{room.roomNumber}</li>
            ))}
          </ul>
        </div>
      )}
    </Paper>
  );
};
