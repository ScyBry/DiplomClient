import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
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
import { BASE_URL, WEEK_DAYS } from '../../constants';

export const ExportToExcel = () => {
  const [day, setDay] = useState<string>(WEEK_DAYS[0].value);

  const handleExport = async () => {
    const response = await axios.get(`${BASE_URL}/schedule/exportExcel`, {
      responseType: 'arraybuffer',
      params: {
        day,
        location: location,
      },
    });
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'day-schedules.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setDay(value);
  };

  const [location, setLocation] = useState('ГЛВ');

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocation(value);
  };

  return (
    <Paper className="flex flex-col  gap-8 p-6">
      <Typography variant="h4">
        Выберите на какой день хотите <br /> получить расписание
      </Typography>
      <div className="flex flex-col  gap-4">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Выберите день</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={day}
            label="Выберите день"
            onChange={handleChange}
            sx={{ minWidth: '300px' }}
          >
            {WEEK_DAYS.map(day => (
              <MenuItem value={day.value}>{day.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Выберите корпус</FormLabel>
          <RadioGroup
            row
            aria-label="building"
            onChange={handleLocationChange}
            value={location}
          >
            <FormControlLabel
              value="ГЛВ"
              control={<Radio />}
              label="Главный корпус"
            />
            <FormControlLabel value="УПК" control={<Radio />} label="Учебный" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleExport}>
          Экспортировать в таблицу
        </Button>
      </div>
    </Paper>
  );
};
