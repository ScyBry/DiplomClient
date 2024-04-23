import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Typography,
} from '@mui/material';

export const DaySchedule = ({ scheduleData }: any) => {
  return (
    <Box>
      <Paper>
        <Stack direction="row" gap={4}>
          <Typography variant="subtitle2">#Зан.</Typography>
          <Typography variant="subtitle2">Время</Typography>
          <Typography variant="subtitle2">Группа: 32о</Typography>
          <Typography variant="subtitle2">Кабинет</Typography>
        </Stack>
      </Paper>
    </Box>
  );
};
