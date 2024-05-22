import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

export const ExportToExcel = () => {
  const handleExport = async () => {
    const response = await axios.get(
      'http://localhost:7777/api/schedule/aboba',
      {
        responseType: 'arraybuffer',
      },
    );
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

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Экспортировать в таблицу
    </Button>
  );
};
